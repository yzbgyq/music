<template>
    <!-- 搜索结果相关显示 -->
    <div class="search-result">
        <Scroll class="suggest" :data='result' :pullup='pullup' @scrollToEnd='scrollToEnd' ref="scroll">
            <ul class="item-warpper">
                <li class="item" v-for="(val,index) in result" :key="index" @click="item(val)">
                    <div class="icon"><i :class="iconClass(val)"></i></div>
                    <div class="name"><p class="text" v-html="getName(val)"></p></div>
                </li>
                <li class="nomore" v-show="totalnum==0 && result.length>20">没有更多了~~</li>
            </ul>
        </Scroll>
        <Loading v-show="isLoding"/>
        <router-view/>
    </div>
</template>

<script>
import {searchs} from 'api/search'
import Loading from 'pages/other/BaseLoading'
import Scroll from 'pages/other/Scroll'
import { createSong } from 'js/singerDetailsClass'
import {mapMutations} from 'vuex'
import Singer from 'js/singerClass'
const SINGER = 'singer'
export default {
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
            isLoding:true
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
            if (val.type && val.type == 'singer') {
                const singer = new Singer({
                    id: val.singermid,
                    name: val.singername
                })
                this.setSinger(singer)
                this.$router.push({path:`/search/${val.singermid}`})
            } else {
                console.log(val);
                
            }
            
        },

        ...mapMutations({
            setSinger:'SINGER'
        }),
    },
    
    watch: {
        query() {
            this.$refs.scroll.scrollTo(0,0)
            this.page = 1
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

