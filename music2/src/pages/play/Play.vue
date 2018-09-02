<template>
    <div class='player' v-show='playlist && playlist.length'> 
        <transition name='normal'
                    @enter='enter'
                    @after-enter='afterEnter'
                    @leave='leave'
                    @after-leave='afterLeave'
        >
            <div class='normal-player' v-show='fullScreen'>
                <div class='background'>
                    <img :src="currentSong.image" width='100%' height='100%' alt="" srcset="">
                </div>
                <div class='top'>
                    <div class='back' @click='back'><i class='icon-back'></i></div>
                    <h1 class='title' v-html='currentSong.name'></h1>
                    <h2 class='subtitle'>{{currentSong.singer}}</h2>
                </div>
                <div class='middle' 
                     @touchstart.prevent='middleTouchStart'
                     @touchmove.prevent='middleTouchMove'
                     @touchend.prevent='middleTouchEnd'>
                    <div class='middle-l' ref="middleL">
                        <div class='cd-wrapper' ref='cdWrapper'>
                            <div class='cd' :class='cdCss'>
                                <img class='image' :src="currentSong.image" alt="" srcset="">
                            </div>
                        </div>
                    </div>
                    <Scroll class='middle-r' ref="lyricList" :data='currentLyric.lines'>
                        <div class="lyric-warpper" >
                            <div v-if="currentLyric">
                                <p ref="lyricLine" :class="{'current':currentLineNum===index}" class="text" v-for="(line,index) in currentLyric.lines" :key="index">{{line.txt}}</p>
                            </div>
                        </div>
                    </Scroll>
                </div>
                <div class='bottom'>
                    <div class='dot-wrapper'>
                        <span class='dot' :class="{'active':currentShow=='cd'}"></span>
                        <span class='dot' :class="{'active':currentShow=='lyric'}"></span>
                    </div>
                    <Progress :progressTime='currentSong.duratin' :currentTimer='currentTime' @percentChange='percentChange'/>
                <div class='operators'>
                    <div class='icon i-left' @click="changeMode">
                        <i :class='iconMode'></i>
                    </div>
                    <div class='icon i-left' :class='disableClass'>
                        <i class='icon-prev' @click='prev'></i>
                    </div>
                    <div class="icon i-center" :class='disableClass'>
                        <i class="needsclick" :class='playIcon' @click='togglePlay'></i>
                    </div>
                    <div class="icon i-right" :class='disableClass'>
                        <i class="icon-next" @click='next'></i>
                    </div>
                    <div class="icon i-right">
                        <i class="icon icon-not-favorite"></i>
                    </div>
                </div>
            </div>
       
        </div>
</transition>
        <transition name='mini'>
        <div class='mini-player' v-show='!fullScreen' @click='open'>
            <div class='icon'>
                <div class='imgWrapper' :class='cdCss'>
                    <img :src="currentSong.image" width="40" height='40' style='border-radius:50%' alt="" srcset="">
                </div>
            </div>
            <div class='text'>
                <h2 class='name' v-html='currentSong.name'></h2>
                <p class='desc'>{{currentSong.singer}}</p>
            </div>
            <div class='control'>
                <i :class='miniPlayIcon' class='icon-mini'  @click.stop='togglePlay'></i>
            </div>
            <div class='control'>
                <i class='icon-playlist'></i>
            </div>
        </div>
        </transition>
        <audio ref='audio' :src='currentSong.url' @canplay='canplay' @error='error' @timeupdate='timeupdate' @ended="end">

        </audio>
    </div>
</template>

<script>
import animations from 'create-keyframe-animation'
import {prefixStyle} from 'js/dom'
const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')
import {mapGetters,mapMutations} from 'vuex'
import Progress from './components/PlayProgress'
import {playMode} from 'js/config'
import {shuffle} from 'js/utils'
import lyric from 'lyric-parser'
import Scroll from 'pages/other/Scroll'

export default {
    data() {
        return {
            isPlay: false,  // 控制音乐是否能播放
            currentTime:'', //当前播放的时间
            currentLyric:'',    //歌词
            currentLineNum:0,   //初始化歌曲播放的行数
            currentShow: 'cd',  //默认选中哪一个
            touch:{},
        }
    },
    components: {
        Progress,
        Scroll,
    },
    computed: {
        // 是否全屏 ，播放列表,当前播放的歌曲,歌曲是否在播放,当前歌曲的下标,播放模式,播放列表
        ...mapGetters(['fullScreen','playlist','currentSong','playing','currentIndex','mode','sequenceList']),

        playIcon() {    //暂停播放图标
            return this.playing ? 'icon-pause' : 'icon-play'
        },

        miniPlayIcon() {    //暂停播放图标
            return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
        },

        cdCss() {
            return this.playing ? 'play' : 'play pause'
        },

        // 切换的时候按钮禁止点击
        disableClass() {
            return  this.isPlay ? '' : 'disable'
        },

        // 播放模式，按钮样式
        iconMode() {
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
        }
    },
    methods: {
        back() {
            this.setFullScreen(false)
        },

        ...mapMutations({
            setFullScreen:'FULLSREEN',
            setPlaylist:'PLAYING',
            setCurrentIndex:'CURRENTINDEX',
            setMode:'MODE',
            setplayList:'PLAYLIST'
        }),

        open() {
            this.setFullScreen(true)
        },

        // 以下4个是动画钩子
        enter(el,done) {
            const {x,y,scale} = this.getPosAndScale()
            let animation = {
                0: {
                    transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
                },
                60: {
                    transform: `translate3d(0,0,0) scale(1.1)`
                },
                100: {
                     transform: `translate3d(0,0,0) scale(1)`
                }
            }
            animations.registerAnimation({
                name: 'move',
                animation,
                presets: {
                    duration: 400,
                    easing: 'linear',
                 }
            })
            animations.runAnimation(this.$refs.cdWrapper, 'move', done)
        },

        afterEnter() {
            // animations.unreqisterAnimation('move')
            this.$refs.cdWrapper.style.animation = ''
        },

        leave(el,done) {
            this.$refs.cdWrapper.style.transition = 'all .4s';
            const {x,y,scale} = this.getPosAndScale()
            this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
            this.$refs.cdWrapper.addEventListener('transitionend',done)
        },

        afterLeave() {
            this.$refs.cdWrapper.style.transition = ''
             this.$refs.cdWrapper.style[transform] = ''
        },

        // 获取初始的缩放尺寸，位置等
        getPosAndScale() {
            const targetWidth = 40;
            const paddingLeft = 40;
            const paddingBottom = 40;
            const paddingtop = 80;
            const width = window.innerWidth * 0.8;
            const scale = targetWidth / width
            const x = -(window.innerWidth / 2 - paddingLeft)
            const y = window.innerHeight - paddingtop - width / 2 - paddingBottom
            return {
                x,
                y,
                scale
            }
        },

        // 暂停,播放音乐
        togglePlay() {
            if (!this.isPlay) {
                return;
            }
            this.setPlaylist(!this.playing)
        },

        // 上一首
        prev() {
            if (!this.isPlay) {
                return;
            }
            let index = this.currentIndex - 1
            if (index == -1) {
                index = this.playlist.length - 1;
            }
            this.setCurrentIndex(index);
            if (!this.playing) {
                this.togglePlay()
            }
            this.isPlay = false;
        },

        // 下一首
        next() {
            if (!this.isPlay) {
                return;
            }
            let index = this.currentIndex + 1
            if (index == this.playlist.length) {
                index = 0;
            }
            this.setCurrentIndex(index);
            if (!this.playing) {
                this.togglePlay()
            }
            this.isPlay = false;
        },

        // 当浏览器可以播放音频/视频时派发一个事件
        canplay() {
            this.isPlay = true; //设置歌曲可以播放
        },

        // 当歌曲发生播放错误时
        error() {
            this.isPlay = true; //设置歌曲可以播放
        },

        // 获取播放的时间
        timeupdate(e) {
            this.currentTime = e.target.currentTime;   
        },

        // 进度条拖动
        percentChange(percent) {
            this.$refs.audio.currentTime = this.currentSong.duratin * percent
            if(!this.playing) {
                this.togglePlay()
            }
        },

        // 播放模式的样式切换
        changeMode() {
            const mode = (this.mode + 1) % 3
            this.setMode(mode)
            let list = null
            
            if (mode === playMode.random) {
                // 洗牌
                list = shuffle(this.sequenceList)
            } else {
                list = this.sequenceList
            }
            this.restCurrentIndex(list)
            this.setplayList(list)
        },
        // 当播放模式发生改变的时候
        restCurrentIndex(list) {
            let index = list.findIndex(item => {
                return item.id == this.currentSong.id
            })
            this.setCurrentIndex(index)
        },

        // 歌曲播放完切换下一首
        end() {
            if (this.mode == playMode.loop) {
                this.$refs.audio.currentTime = 0
                this.$refs.audio.play()
            } else {
                this.next()
            }
        },

        // 获取歌词
        getLyric() {
            this.currentSong.getLyric().then(res => {
                
                this.currentLyric = new lyric(res,this.handleLyric)
                if (this.playing) {
                    this.currentLyric.play()
                }
            })
        },

        handleLyric({lineNum,txt}) {
            this.currentLineNum = lineNum
            if (lineNum > 5) {
                let lineEl = this.$refs.lyricLine[lineNum-5]
                this.$refs.lyricList.scrollToElement(lineEl,1000)
            } else {
                this.$refs.lyricList.scrollTo(0,0,1000)
            }
        },

        middleTouchStart(e) {
            this.touch.init = true
            const touch = e.touches[0]
            this.touch.startX = touch.pageX  //记录点击的位置
            this.touch.startY = touch.pageY  //记录点击的位置
        },

        middleTouchMove(e) {
            if (!this.touch.init) return
            const touch = e.touches[0]
            const daltaX = touch.pageX - this.touch.startX  // 滑动的位置
            const daltaY = touch.pageY - this.touch.startY  // 滑动的位置
            // 当纵轴的偏移大于横轴的偏移，就不左右移动
            if (Math.abs(daltaY) > Math.abs(daltaX)) return
            // 记录歌词的起始位置
            const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
            const offsetWidth = Math.min(0,Math.max(-window.innerWidth,left + daltaX)) 
            this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)` 
            this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
            this.$refs.middleL.style.opacity = 1 - this.touch.percent
            this.$refs.lyricList.$el.style[transitionDuration] = 0 
            this.$refs.middleL.style[transitionDuration] = 0 

        },

        middleTouchEnd(e) {
            let offsetWidth
            let opacity
            if (this.currentShow === 'cd') {
               if (this.touch.percent > 0.1) {
                   offsetWidth = -window.innerWidth
                   this.currentShow = 'lyric'
                   opacity = 0
               } else {
                   offsetWidth = 0
                   opacity = 1
               }
            } else {
                if (this.touch.percent < 0.9) {
                    offsetWidth = 0
                    this.currentShow = 'cd'
                    opacity = 1
                } else {
                    offsetWidth = -window.innerWidth
                    opacity = 0
                }
            }
            const timer = 500
            this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)` 
            this.$refs.lyricList.$el.style[transitionDuration] = `${timer}ms` 
            this.$refs.middleL.style.opacity = opacity
            this.$refs.middleL.style[transitionDuration] = `${timer}ms` 

    },
    },

    watch: {
        //currentSong发生变化的时候去播放音乐
        currentSong(newSong,oldSong) {
            // 歌曲id不变，就不播放
            if (newSong.id == oldSong.id) {
                return
            }
            this.$nextTick(() => {
                 this.$refs.audio.play()
                 this.getLyric()    // 获取歌词
            })
        },
        playing(newPlay) {
            const play = this.$refs.audio
            this.$nextTick(() => {
                newPlay ? play.play() : play.pause()
            })
        }
    }
}
</script>

<style scoped lang='stylus'>
@import '~styles/varibles.styl'
@import '~styles/mixin.styl'
    .player
        .normal-player
            position: fixed
            left: 0
            right: 0
            top: 0
            bottom: 0
            z-index: 150
            background: $color-background
            .background
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                z-index: -1
                opacity: .6
                filter: blur(20px)
            .top
                position: relative
                margin-bottom: 50px
                .back
                    position: absolute
                    top: 0
                    left: 12px
                    z-index: 50
                    .icon-back
                        display: block
                        padding: 18px
                        font-size: 44px
                        color: $color-theme
                        transform: rotate(-90deg)
                .title
                    width: 70%
                    margin: 0 auto
                    line-height: 80px
                    text-align: center
                    ellipsis()
                    font-size: 36px
                    color: #fff       
                .subtitle
                    line-height: 40px
                    text-align: center
                    font-size: 28px
                    color: #fff
            .middle
                position: fixed
                width: 100%
                top: 160px
                bottom: 340px
                white-space: nowrap
                font-size: 0      
                .middle-l
                    display: inline-block
                    vertical-align: top
                    position: relative
                    width: 100%
                    height: 0
                    padding-top: 80%
                    .cd-wrapper
                        position: absolute
                        left: 10%
                        top: 0
                        width: 80%
                        box-sizing: border-box
                        height: 100%
                        .cd
                            width: 100%
                            height: 100%
                            border-radius: 50%
                            &.play
                                animation rotate 20s linear infinite
                            &.pause
                                animation-play-state: paused
                            .image
                                position: absolute
                                left: 0
                                top: 0
                                width: 100%
                                height: 100%
                                box-sizing: border-box
                                border-radius: 50%
                                border: 20px solid hsla(0,0%,100%,.1)
                .middle-r
                    display: inline-block
                    vertical-align: top
                    width: 100%
                    height: 100%
                    overflow: hidden      
                    .lyric-warpper
                        width: 80%;
                        margin: 0 auto;
                        overflow: hidden;
                        text-align: center;
                        .text
                            line-height: 64px;
                            color: hsla(0,0%,100%,.5);
                            font-size: 28px;
                        .current
                            color #fff;    
            .bottom
                position: absolute
                bottom: 100px
                width: 100%       
                .dot-wrapper
                    text-align: center
                    font-size: 0    
                    .dot
                        display: inline-block
                        vertical-align: middle
                        margin: 0 8px
                        width: 16px
                        height: 16px
                        border-radius: 50%
                        background: hsla(0,0%,100%,.5)
                    .active
                        width: 40px
                        border-radius: 10px
                        background: hsla(0,0%,100%,.8)
                .operators
                    display: flex
                    align-items: center
                    .icon
                        flex: 1
                        color: $color-theme
                    .i-left
                        text-align: right
                        .icon-sequence,.icon-prev,.icon-random,.icon-loop
                            font-size 60px    
                    .i-center
                        padding: 0 40px
                        text-align: center
                        .icon-play,.icon-pause
                            font-size 80px    
                    .i-right
                        text-align left    
                        .icon-next,.icon-not-favorite
                            font-size 60px  
                    .disable
                        color rgba(255,255,49,.5)      
            &.normal-enter-active, .normal-leave-active
                transition all .3s
                .top, .bottom
                    transition all .3s cubic-bezier(0.86,0.18,0.82,1.32)
            &.normal-enter, &.normal-leave-to
                transition all .3s
                opacity: 0
                .top
                    transform: translate3d(0, -100px, 0)
                .bottom
                    transform: translate3d(0, 100px, 0)         
        .mini-player
            display: flex
            align-items: center
            position: fixed
            left: 0
            bottom: 0
            z-index: 180
            width: 100%
            height: 120px
            background: $color-highlight-background  
            &.mini-enter-active, &.mini-leave-active
                transition: all 0.4s
            &.mini-enter, &.mini-leave-to
                opacity: 0
            .icon
                flex: 0 0 80px
                width: 80px
                height: 80px
                padding: 0 20px 0 40px
                .imgWrapper
                    width 100%
                    height 100%
                    &.play
                        animation rotate 20s linear infinite
                    &.pause
                        animation-play-state: paused
            .text
                display: flex
                flex-direction: column;
                justify-content: center;
                flex: 1;
                line-height: 40px;
                overflow: hidden;
                .name
                    margin-bottom: 4px
                    text-overflow: ellipsis
                    overflow: hidden
                    white-space: nowrap
                    font-size: 28px
                    color: #fff
                .desc
                    text-overflow: ellipsis
                    overflow: hidden
                    white-space: nowrap
                    font-size: 24px
                    color: hsla(0,0%,100%,.3)
            .control
                flex: 0 0 60px;
                width: 60px;
                padding: 0 20px;      
                .icon-playlist,.icon-mini
                    font-size: 60px;
                    color: rgba(255,205,49,.5);  
@keyframes rotate
    0%
        transform rotate(0)
    100%
        transform rotate(360deg)            
</style>