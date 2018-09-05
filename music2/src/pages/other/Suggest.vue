<template>
    <!-- 搜索结果相关显示 -->
    <div class="search-result">
        <Scroll class="suggest" :data='result' :pullup='pullup' @scrollToEnd='scrollToEnd'>
            <ul class="item-warpper">
                <li class="item" v-for="(val,index) in result" :key="index">
                    <div class="icon"><i :class="iconClass(val)"></i></div>
                    <div class="name"><p class="text" v-html="getName(val)"></p></div>
                </li>
            </ul>
        </Scroll>
        <Loading v-if="!result.length"/>
    </div>
</template>

<script>
import {searchs} from 'api/search'
import Loading from 'pages/other/BaseLoading'
import Scroll from 'pages/other/Scroll'
import { createSong } from 'js/singerDetailsClass'

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
            totalnum:0
        }
    },
    components: {
        Loading,
        Scroll,
    },

    methods: {
        _search(flag,page=1) {
            page = this.page
            searchs(this.query,page,this.showSinger).then(res => {
                if (res.code == 0) {
                    this.totalnum = res.data.song.totalnum
                    if (flag) {
                        const arr = [...this.result, ...this.genResult(res.data)]
                        this.result = arr
                        console.log(res.data);
                    } else {
                        this.result = this.genResult(res.data)
                        console.log(res.data);
                        
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
                return
            }
            this._search(true,this.page)
            
        }
    },
    
    watch: {
        query() {
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
    .loading
      position: absolute
      top: 40%
      left: 50%
      width 100%
      transform translate(-50%,-50%)                    
</style>

