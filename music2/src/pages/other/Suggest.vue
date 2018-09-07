<template>
    <!-- 搜索结果相关显示 -->
    <div class="search-result" ref="search">
        <Scroll class="suggest" :data='result' :pullup='pullup' @scrollToEnd='scrollToEnd' ref="scroll" :beforeScroll='beforeScroll' @beforeScroll='listbeforeScroll'>
            <div>   
                <div v-if="noResult" class="noResult">没有搜索结果噢~~</div>
                <ul class="item-warpper">
                    <li class="item" v-for="(val,index) in result" :key="index" @click="item(val)">
                        <div class="icon"><i :class="iconClass(val)"></i></div>
                        <div class="name"><p class="text" v-html="getName(val)"></p></div>
                    </li>
                    <li class="nomore" v-show="totalnum==0 && result.length>20">没有更多了~~</li>
                </ul>
            </div>
        </Scroll>
        <Loading v-show="isLoding"/>
    </div>
</template>

<script>
import {searchs} from 'api/search'
import Loading from 'pages/other/BaseLoading'
import Scroll from 'pages/other/Scroll'
import { createSong } from 'js/singerDetailsClass'
import {mapMutations,mapActions} from 'vuex'
import Singer from 'js/singerClass'
import {playlistMixin} from 'js/mixin'

const SINGER = 'singer'
export default {
    mixins:[playlistMixin],
    props:{
        query: {
            type: String,
            default: ''
        },
        showSinger: {   //是否显示歌手
            type: Boolean,
            default: true
        }
    },
    
    data() {
        return {
            page: 1,
            result:[],
            pullup: true,
            totalnum:0,
            isLoding:true,
            noResult: false,
            beforeScroll: true
        }
    },
    components: {
        Loading,
        Scroll,
    },

    methods: {
        _search(flag,page=1) {
            page = this.page
            this.isLoding = true
            
            
            searchs(this.query,page,this.showSinger).then(res => {
                if (res.code == 0) {
                    this.isLoding = false
                    this.totalnum = res.data.song.totalnum
                    if (!res.data.song.list.length) {
                        this.noResult = true
                    }
                    if (flag) {
                        const arr = [...this.result, ...this.genResult(res.data)]
                        this.result = arr
                    } else {
                        this.result = this.genResult(res.data)
                    }
                }
            })
        },

        genResult(data) {
            let ret = []
            if (data.zhida && data.zhida.singerid) {
                ret.push({
                    ...data.zhida,
                    ...{type:SINGER}
                })
            }
            if (data.song) {
                ret = ret.concat(this.normalize(data.song.list))
            }
            return ret
        },

        iconClass(val) {
            if (val.type == SINGER) {
                return 'icon-mine'
            } else {
                return 'icon-music'
            }
        },

        getName(val) {
            if (val.type == SINGER) {
                return val.singername
            } else {
                return `${val.name} -- ${val.singer}`
            }
        },

        normalize(list) {
            let ret = []
            list.forEach(item => {
                if (item.songid && item.albumid) {
                    ret.push(createSong(item))
                }
            });
            return ret
        },

        scrollToEnd() {
            this.page++
            if (this.totalnum == 0) {
                this.$refs.scroll.refresh()
                return
            }
            this._search(true,this.page)
            
        },

        item(val) {
            if (val.type && val.type == SINGER) {
                const singer = new Singer({
                    id: val.singermid,
                    name: val.singername
                })
                this.setSinger(singer)
                this.$router.push({path: `/search/${val.singermid}` })
            } else {
                this.insertSong(val)
            }
            this.$emit('select')
        },

        ...mapMutations({
            setSinger:'SINGER'
        }),

        ...mapActions(['insertSong']),

        handlePlaylist(playlist) {
            const bottom = playlist.length > 0 ? '60px' : 0
            this.$refs.search.style.bottom = bottom
            this.$refs.scroll.refresh()
        },

        // 滚动键盘消失
        listbeforeScroll() {
            this.$emit('listbeforeScroll')
        }
    },
    
    watch: {
        query() {
            this.$refs.scroll.scrollTo(0,0)
            this.page = 1
            this.noResult = false
            this._search()
        }
    }
}
</script>

<style lang="stylus" scoped>
.search-result
    position: fixed;
    width: 100%;
    top: 356px;
    bottom: 0;
    .suggest
        height: 100%;
        overflow: hidden;
        .noResult
            font-size 28px
            color #eeeeee
            text-align center
            height 100px
            line-height 100px
        .item-warpper
            padding: 0 60px;
            .item
                display: flex;
                align-items: center;
                padding-bottom: 40px;
                &.last-child
                    padding-bottom 0
                .icon
                    flex: 0 0 60px;
                    width: 60px;
                    .icon-music,.icon-mine
                        font-size: 26px;
                        color: hsla(0,0%,100%,.3)
                .name
                    flex: 1;
                    font-size: 28px;
                    color: hsla(0,0%,100%,.3);
                    overflow: hidden;        
                    .text
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                
            .nomore
                color #eee           
                text-align center
                height 50px
                line-height 50px
                font-size 28px 
    .loading
      position: absolute
      top: 40%
      left: 50%
      width 100%
      transform translate(-50%,-50%)                    
</style>

