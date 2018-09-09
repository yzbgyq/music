<template>
    <!-- 添加歌曲到列表组件 -->
    <transition name='bounce'>
        <div class="add-song" v-show="showFlag" @click.stop>
            <div class="header">
                <h1 class="title">添加歌曲到列表</h1>
                <div class="close" @click="showFlag=false"><i class="icon-close"></i></div>
            </div>
            <SearchBox placeholder="搜索歌曲" @queryTxt='querys'/>
            <div class="search-result" v-show="query">
                <Suggest :query='query' :showSinger='showSinger' @select='saveSearch'/>
            </div>
            <BaseSwitches :switches='list' :currentIndex='currentIndex' @switchItem='switchItem' v-if="!query"/>
            <div class="list-wrapper" ref="listWarpper" v-if="!query">
                <Scroll  class="list-scroll"  :data='playHistory' v-if="currentIndex===0" ref="scroll" >
                    <div class="list-inner"> 
                        <MusicList :songs='playHistory' @select='selectItem'/>
                    </div>
                </Scroll>
                <Scroll v-if="currentIndex===1" :data='searchCache' class="list-scroll" ref="scroll2">
                    <div class="list-inner2">
                        <Storage :searchList='searchCache' @selectVal='selectVal' @delectOne='delectSearchHistory' @delectAll='delectAll'/>
                    </div>
                </Scroll>
            </div>
            <BaseComfirm ref="comfirm" @ok='delectSearchHistoryAll' title="是否清空搜索历史"/>
        </div>
    </transition>
</template>

<script>
import SearchBox from 'other/SearchBox'
import Suggest from 'other/Suggest'
import {searchMixin} from 'js/mixin'
import BaseSwitches from 'other/BaseSwitches'
import Scroll from 'other/Scroll'
import MusicList from 'other/MusicList'
import Storage from 'other/Storage'
import BaseComfirm from 'other/BaseComfirm'
import {mapGetters,mapActions} from 'vuex'
import singerDetails from 'js/singerDetailsClass'
export default {
    mixins: [searchMixin],
    components: {
        SearchBox,
        Suggest,
        BaseSwitches,
        Scroll,
        MusicList,
        Storage,
        BaseComfirm,
    },

    computed: {
        ...mapGetters(['playHistory','searchCache'])
    },

    data() {
        return {
            showFlag: false,
            query: '',
            showSinger: false,
            list: [
                {id:0,title:'最近播放'},
                {id:1,title:'搜索历史'}
            ],
            currentIndex: 0,
            timer: 100
        }
    },

    methods: {
        show() {
            this.showFlag = true
            setTimeout(() => {
               this.currentIndex == 0 ? this.$refs.scroll.refresh() : this.$refs.scroll2.refresh()
            },20)
        },

        querys(txt) {
            this.query = txt
        },

        selectItem(val, index) {
            if (index != 0) {
                this.insertSong(new singerDetails(val))
            }
        },

        ...mapActions(['insertSong'])
    },
    
 
}
</script>

<style lang="stylus" scoped>
.add-song
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 99999;
    background: #222;
    .header
        position: relative;
        height: 88px;
        text-align: center;
        .title
            line-height: 88px;
            font-size: 36px;
            color: #fff;
        .close
            position: absolute;
            top: 0;
            right: 16px;    
            .icon-close
                display: block;
                padding: 24px;
                font-size: 40px;
                color: #ffcd32;
    .search-result
        position: fixed;
        top: 248px;
        bottom: 0;
        width: 100%
    .list-wrapper
        position: absolute;
        top: 330px;
        bottom: 0;
        width: 100%;    
        .list-scroll
            height 100%
            overflow hidden
            .list-inner
                padding 40px 60px
            .list-inner2
                padding 0  
.bounce-enter-active {
    animation: bounce-in .3s;
        }
    .bounce-leave-active {
            animation: bounce-in .3s reverse;
            }
    @keyframes bounce-in {
    0% {
        transform: translate3d(100%,0,0)
        }
    
    100% {
        transform: translate3d(0,0,0)
        }
    }                  
</style>

