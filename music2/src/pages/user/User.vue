<template>
<transition name='bounce'>
        <div class="user-center">
            <router-link to="/" tag="div" class="back">
                <i class="icon-back"></i>
            </router-link>
            <div class="switches-wrapper">
                <BaseSwitches :switches='list' :currentIndex='currentIndex' @switchItem='switchItem' />
            </div>
            <div class="play-btn" @click="random">
                <i class="icon-play"></i>
                <span class="text">随机播放全部</span>
            </div>
            <div class="list-wrapper" ref="listWarpper">
                <Scroll :data='iLikeSongs' v-if="currentIndex===0" ref="scroll" class="list-scroll">
                    <div class="list-item">
                        <MusicList :songs='iLikeSongs' @select='selectItem'/>
                    </div>
                </Scroll>
                <Scroll :data='playHistory' v-if="currentIndex===1" ref="scroll2" class="list-scroll">
                    <div class="list-item">
                        <MusicList :songs='playHistory' @select='selectItem2'/>
                    </div>
                </Scroll>
            </div>
        </div>
</transition>    
</template>

<script>
import BaseSwitches from 'other/BaseSwitches'
import {searchMixin,playMixin} from 'js/mixin'
import MusicList from 'other/MusicList'
import Scroll from 'other/Scroll'
import {mapGetters,mapActions} from 'vuex'
import singerDetails from 'js/singerDetailsClass'
export default {
    mixins: [searchMixin],
    components: {
        BaseSwitches,
        MusicList,
        Scroll,
    },

    data() {
        return {
            list: [
                {id:0,title:'我喜欢的'},
                {id:1,title:'最近听的'}
            ],
            currentIndex: 0,
        }
    },
    methods: {
        ...mapActions(['randomPlay','selectPlay']),

        handlePlaylist() {
            const bottom = this.playlist.length > 0 ? '50px' : 0
            this.$refs.listWarpper.style.bottom = bottom
            setTimeout(() => {
                   this.currentIndex === 0 ? this.$refs.scroll.refresh() : this.$refs.scroll2.refresh()
            }, 20);
         
        },

        selectItem(val,index) {
            let list = this.iLikeSongs.map( item => {
                return new singerDetails(item)
            })
            this.selectPlay({
                list:list,    //整个歌曲列表
                index
            })
        },

        selectItem2(val,index) {
            let list = this.playHistory.map( item => {
                return new singerDetails(item)
            })
            this.selectPlay({
                list:list,    //整个歌曲列表
                index
            })
        },
        
        // 随机播放歌曲
        random() {
            let list = this.currentIndex == 0 ? this.iLikeSongs : this.playHistory
            list = list.map( item => {
                return new singerDetails(item)
            })
            this.randomPlay({
                list
            })
        }
    },
    computed: {
        ...mapGetters(['iLikeSongs','playlist','playHistory'])
    },

    mounted() {
        this.handlePlaylist()
    },
}
</script>

<style lang="stylus" scoped>
.user-center
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    background: #222;
    .back
        position: absolute;
        top: 0;
        left: 12px;
        z-index: 50;
        .icon-back
            display: block;
            padding: 20px;
            font-size: 44px;
            color: #ffcd32;
    .switches-wrapper
        margin: 20px 0 60px;        
    .play-btn
        box-sizing: border-box;
        width: 270px;
        padding: 14px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid hsla(0,0%,100%,.5);
        color: hsla(0,0%,100%,.5);
        border-radius: 200px;
        font-size: 0;
        .icon-play
            display: inline-block;
            vertical-align: middle;
            margin-right: 12px;
            font-size: 32px;
        .text
            display: inline-block;
            vertical-align: middle;
            font-size: 24px;    
    .list-wrapper
        position: absolute;
        top: 220px;
        bottom: 0;
        width: 100%;        
        .list-scroll
            height: 100%;
            overflow: hidden;
            .list-item
                padding 20px 60px    
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

