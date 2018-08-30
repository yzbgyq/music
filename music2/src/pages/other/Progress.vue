<template>
<div class='progress-wrapper' >
    <span class="time time-l">{{fomat(currentTimer)}}</span>
    <div class='progress-bar-wrapper'>
        <div class="progress-bar" ref="progressBar" @click="progressClick">
        <div class="bar-inner" >
            <div class="progress" ref="progress"></div><!-- 播放器进度条的位置 -->
            <div class="progress-btn-wrapper">
                <div class="progress-btn" ref="progressBtn"
                     @touchstart.prevent='progressTouchStart'
                     @touchmove.prevent='progressTouchMove'
                     @touchend.prevent='progressTouchEnd'
                ></div><!-- 按钮 -->
            </div>
        </div>
    </div>
    </div>
    <span class="time time-r">{{fomat(progressTime)}}</span>
</div>

</template>

<script>
import {prefixStyle} from 'js/dom';
const transform = prefixStyle('transform')
    export default {
        props:['currentTimer','progressTime'],
        data() {
            return {
                touch:{},
            }
        },
        computed: {
            // 进度条
            percent() {
                // 当前歌曲的播放时间除以歌曲播放的总时长
                return this.currentTimer / this.progressTime
            }
        },

        methods: {
            fomat(time) {
                time = time | 0;    // 向下取整
                let branch = time / 60 | 0; // 分
                let second = time % 60;     // 秒
                if (second < 10) {
                    second = String(second).padStart(2,'0')
                }
                return `${branch}:${second}`
            },

            progressTouchStart(e) {
                this.touch.init = true
                this.touch.startX = e.touches[0].pageX  //记录点击的位置
                this.touch.left = this.$refs.progress.clientWidth
            },

            progressTouchMove(e) {
                if (!this.touch.init) {
                    return
                }
                const daltaX = e.touches[0].pageX - this.touch.startX  // 滑动的位置
                const offSetWidth = Math.min(this.$refs.progressBar.clientWidth - 16,Math.max(0,this.touch.left + daltaX)) ;
                this.offSetWidth(offSetWidth)
            },

            progressTouchEnd() {
                this.touch.init = false
                // 拖动完成，派发事件
                this.triggerPercent() 
            },

            // 派发事件
            triggerPercent() {
                const barWidth = this.$refs.progressBar.clientWidth 
                const percent = this.$refs.progress.clientWidth / barWidth
                this.$emit('percentChange',percent)
            },

            //小球的实时位置
            offSetWidth(offSetWidth) {
                this.$refs.progress.style.width = `${offSetWidth}px`    // 进度条的实时位置
                this.$refs.progressBtn.style[transform] = `translate3d(${offSetWidth}px,0,0)` 
            },

            progressClick(e) {
                const rect = this.$refs.progressBar.getBoundingClientRect()
                const offSetWidth = e.pageX - rect.left
                this.offSetWidth(offSetWidth)
                this.triggerPercent()
            }
        },

        watch: {
            percent(newPercent) {
                if (newPercent >= 0 && !this.touch.init) {
                    const barWidth = this.$refs.progressBar.clientWidth - 16    //当前进度条总长度
                    const offSetWidth = newPercent * barWidth
                    this.offSetWidth(offSetWidth)
                }
            }
        }
    }
</script>

 <style lang="stylus" scoped>
.progress-wrapper
    display: flex
    align-items: center
    width: 80%
    margin: 0 auto
    padding: 20px 0
    .progress-bar-wrapper
        flex 1
        .progress-bar
            height 60px
            .bar-inner
                position: relative;
                top: 26px;
                height: 8px;
                background: rgba(0,0,0,.3);
                .progress
                    position: absolute;
                    height: 100%;
                    background: #ffcd32;
                .progress-btn-wrapper
                    position: absolute;
                    left: -16px;
                    top: -26px;
                    width: 60px;
                    height: 60px;    
                    .progress-btn
                        position: relative;
                        top: 14px;
                        left: 14px;
                        box-sizing: border-box;
                        width: 32px;
                        height: 32px;
                        border: 6px solid #fff;
                        border-radius: 50%;
                        background: #ffcd32;
    .time 
        color: #fff;
        font-size: 24px;
        flex: 0 0 60px;
        line-height: 60px;
        width: 60px;
    .time-l
        text-align left    
    .time-r
        text-align right 
        
</style>