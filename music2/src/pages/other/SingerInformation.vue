<template>
        <!-- 歌手的信息组件 -->
        <div class='music-list'>
                <div class="back">
                    <div class="icon-back" @click="back"></div>
                </div>
                <h1 class="title" v-html="title"></h1>

            <div class="bg-image" :style="bgStyle" ref="bgImg">
              <div class="play-wrapper">
                <div class="play" v-show="songs && songs.length" ref='play' @click="random">
                  <i class="icon-play"></i>
                  <span class="text">随机播放全部</span>
                </div>
              </div>
                <div class="filter" ref='filter'></div>
            </div>

        <div class="bg-layer" ref="layer"></div>
        <Scroll :data='songs' class="list" ref="list" :listenScroll='listenScroll' :probeType='probeType' @scroll="scroll">
            <div class="song-list-wrapper">
                <MusicList :songs='songs' @select='selectItem'/>
                <div class="loading" v-show="!songs.length">
                  <Loading/>
                </div>
            </div>
        </Scroll>
    </div>
</template>

<script>
import {playlistMixin} from 'js/mixin'
import Scroll from './Scroll'
import MusicList from './MusicList'
import {prefixStyle} from 'js/dom'
import {mapActions} from 'vuex'
import Loading from 'pages/other/BaseLoading'
const RESOLVE_HEIGHT = 40   //预留高度
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')
export default {
    mixins:[playlistMixin],
    props: {
        bgImg: { //背景图
            type:String,
            default:''
        },
        songs: { //歌曲列表
            type:Array,
            default:[]
        },
        title: {   //歌手顶部名字
            type:String,
            default:''
        }
    },
    data() {
        return {
            imgHeight: 0,
            listenScroll: true,
            probeType: 3,
            scrollY:0,
            mintranslateY:0,
        }
    },
    components: {
      Scroll,
      MusicList,
      Loading,
    },
    computed: {
        bgStyle() {
            return `background-image: url(${this.bgImg}); padding-top: 70%; height: 0px; transform: scale(1); z-index: 0;`
        }
    },

    methods: {
        back() {
            this.$router.go(-1)
        },
        // 监听滚动
        scroll(pos) {
            this.scrollY = pos.y
        },
        selectItem(item,index) {
            this.selectPlay({
                list:this.songs,    //整个歌曲列表
                index
            })
        },
        ...mapActions(['selectPlay','randomPlay']),
        // 随机播放
        random() {
            this.randomPlay({
                list:this.songs
            })
        },
        handlePlaylist(playlist) {
            const bottom = playlist.length > 0 ? '60px' : 0
            this.$refs.list.$el.style.bottom = bottom
            this.$refs.list.refresh()
        }
    },

    mounted() {
        this.imgHeight = this.$refs.bgImg.clientHeight
        this.mintranslateY = -this.imgHeight + RESOLVE_HEIGHT
        this.$refs.list.$el.style.top = `${this.imgHeight}px`
    },

    watch: {
        scrollY(newY) {
           let translateY = Math.max(this.mintranslateY,newY);
           let zIndex = 0;
           let scale = 1; //下拉放大
           let blur = 0;  //下拉模糊效果
           this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`;
           const percent = Math.abs(newY / this.imgHeight);
           if (newY > 0) {
             scale = 1 + percent;
             zIndex = 20;
           } else {
             blur = Math.min(20 * percent, 20);
           }
            this.$refs.filter.style[backdrop] = `blur(${blur}px)`;
           if(newY < this.mintranslateY) {
             zIndex = 20;
             this.$refs.bgImg.style.paddingTop = 0;
             this.$refs.bgImg.style.height = `${RESOLVE_HEIGHT}px`;
             this.$refs.play.style.display = 'none'   //按钮的显示与隐藏
           } else {
             this.$refs.bgImg.style.paddingTop = '70%';
             this.$refs.bgImg.style.height = 0;
             this.$refs.play.style.display = ''
           }
           this.$refs.bgImg.style.zIndex = zIndex;
           this.$refs.bgImg.style[transform] = `scale(${scale})`;
        }
    }
}
</script>

<style scoped lang='stylus'>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
    .music-list
        position: fixed
        z-index: 100
        top: 0
        left: 0
        bottom: 0
        right: 0
        background: $color-background
        .back
            position: absolute
            top: 0
            left: 12px
            z-index: 50
            display: block
            .icon-back
                padding: 20px
                font-size: 44px
                color: $color-theme
        .title
            position: absolute
            top: 0
            left: 10%
            z-index: 40
            width: 80%
            ellipsis()
            text-align: center
            line-height: 80px
            font-size: 36px
            color: #fff
        .bg-image
            position: relative
            width: 100%
            height: 0
            padding-top: 70%
            transform-origin: top
            background-size: cover
            .play-wrapper
              position: absolute
              bottom: 40px
              z-index: 50
              width: 100%
              .play
                box-sizing: border-box
                width: 270px
                padding: 14px 0
                margin: 0 auto
                text-align: center
                border: 1px solid $color-theme
                color: $color-theme
                border-radius: 100px
                font-size: 0
                .icon-play
                  display: inline-block
                  vertical-align: middle
                  margin-right: 12px
                  font-size: 32px
                .text
                  display: inline-block
                  vertical-align: middle
                  font-size: 24px
            .filter
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
                background: rgba(7,17,27,.4)
    .list
        position: absolute
        bottom: 0
        width: 100%
        top 0
        background: $color-background
    .song-list-wrapper
        padding: 40px 60px
    .bg-layer
        position: relative
        height: 100%
        background: $color-background
</style>
