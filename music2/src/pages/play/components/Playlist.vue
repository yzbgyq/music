<template>
<div>
        <transition name="bounce">
            <div class="list-wrapper" v-show="showFlag">
                <div class="list-header">
                    <h1 class="title">
                        <i class="icon" :class='iconMode' @click="changeMode"></i>
                        <span class="text">{{textInfo}}</span>
                        <span class="clear" @click.stop="deleteAll"><i class="icon-clear"></i></span>
                    </h1>
                </div>
                <Scroll class="list-content" :data='sequenceList' ref="scroll">
                    <transition-group tag="ul" name="list">
                        <li class="item" ref="listItem" v-for="(val,index) in sequenceList" :key="val.id" @click="playSong(val,index)">
                            <i class="current" :class="getCurrentIcon(val)"></i>
                            <span class="text" v-html="val.name"></span>
                            <span class="like"><i class="icon" :class="getLike(val)" @click.stop="addLike(val)"></i></span>
                            <span class="delete" @click.stop="deleteOne(val)"><i class="icon-delete"></i></span>
                        </li>
                    </transition-group>
                </Scroll>
                <div class="list-operate">
                    <div class="add" @click="addSong">
                        <i class="icon-add"></i>
                        <span class="text">添加歌曲到队列</span>
                    </div>
                </div>
                <div class="list-close" @click="showFlag=false">
                    <span>关闭</span>
                </div>
            </div>
        </transition> 
    <transition name="fade">
        <div class="playlist" v-show="showFlag" @click="showFlag=false"></div>
    </transition>
    <BaseComfirm ref="comfirm" @ok='ok' title="是否清空播放列表"/>
</div>

</template>

<script>
import {mapGetters,mapMutations,mapActions} from 'vuex'
import {playMode} from 'js/config'
import Scroll from 'other/Scroll'
import {playMixin,likeMixin} from 'js/mixin'
import BaseComfirm from 'other/BaseComfirm'
export default {
    mixins:[playMixin,likeMixin],
    computed: {
        ...mapGetters(['sequenceList','currentSong','mode','playlist']),
        textInfo() {
            return this.mode == playMode.sequence ? '顺序播放' : this.mode == playMode.loop ? '单曲循环' : '随机播放'
        }
    },

    components: {
        Scroll,
        BaseComfirm
    },

    data() {
        return {
            showFlag: false
        }
    },

    methods: {
        show() {
            this.showFlag = true
            setTimeout(() => {
                this.$refs.scroll.refresh()
                this.scrollToElm(this.currentSong)
            }, 20);
        },

        // 设置当前是哪首歌播放，icon
        getCurrentIcon(val) {
            return val.id === this.currentSong.id ? 'icon-play' : ''
        },

        // 点击列表播放音乐
        playSong(val,index) {
            if (this.mode == playMode.random) {
                index = this.playlist.findIndex(song => {
                    return song.id === val.id
                })
            }
            this.setCurrentIndex(index)
            this.setPlaying(true)
        },

        ...mapMutations({
            setCurrentIndex: 'CURRENTINDEX',
            setPlaying:'PLAYING'
        }),

        // 点击歌曲滚动到顶部
        scrollToElm(current) {
            const index = this.sequenceList.findIndex(song => {
                return current.id === song.id
            })
            this.$refs.scroll.scrollToElement(this.$refs.listItem[index],300)
        },

        // 删除单个
        deleteOne(val) {
            this.deleteSong(val)
            if (!this.playlist.length) {
                this.showFlag = false
            }
        },

        ...mapActions(['deleteSong','deleteSongAll']),

        // 删除全部列表
        deleteAll() {
            this.$refs.comfirm.showComf()
             
        },

        // 确认删除全部列表
        ok() {
            this.deleteSongAll()
            this.showFlag = false
        },

        // 添加歌曲到队列
        addSong() {
            setTimeout(() => {
                 this.showFlag = false
            },100)
            this.$emit('addSong')
        }
    },
    
    watch: {
        currentSong(newSong,oldSong) {
            
            if (!this.showFlag || newSong.id === oldSong.id) {
                return
            }
            this.scrollToElm(newSong)
        }
    }
}
</script>

<style lang="stylus" scoped> 
    .playlist
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.6);
        z-index 100000
    .list-wrapper
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 100001;
        width: 100%;
        background-color: #333;
        .list-header
            position: relative;
            padding: 40px 60px 20px 40px;
            .title
                display flex
                align-items center
                .icon
                    margin-right: 20px;
                    font-size: 60px;
                    color: rgba(255,205,49,.5);
                   
                .text
                    flex: 1;
                    font-size: 28px;
                    color: hsla(0,0%,100%,.5);    
                .clear
                    position: relative;    
                    .icon-clear
                        font-size: 28px;
                        color: hsla(0,0%,100%,.3);
        .list-content
            max-height: 480px;
            overflow: hidden;      
            ul
                .item
                    display: flex;
                    align-items: center;
                    height: 80px;
                    padding: 0 60px 0 40px;
                    overflow: hidden;        
                    &.list-enter-active, &.list-leave-active 
                        transition all .1s linear
                    &.list-enter, &.list-leave-to
                        height 0
                    .current
                        flex: 0 0 40px;
                        width: 40px;
                        font-size: 24px;
                        color: rgba(255,205,49,.5);  
                    .text
                        flex: 1;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        font-size: 28px;
                        color: hsla(0,0%,100%,.3);    
                    .like
                        position: relative;
                        margin-right: 30px;
                        font-size: 24px;
                        color: #ffcd32;    
                        .icon-favorite
                            color #d93f30   
                    .delete
                        position: relative;
                        font-size: 24px;
                        color: #ffcd32;
        .list-operate
            width: 280px;
            margin: 40px auto 60px;        
            .add
                display: flex;
                align-items: center;
                padding: 16px 32px;
                border: 1px solid hsla(0,0%,100%,.5);
                border-radius: 100px;
                color: hsla(0,0%,100%,.5);        
                .icon-add
                    margin-right: 10px;
                    font-size: 20px;
                .text
                    font-size: 24px;    
        .list-close
            text-align: center;
            line-height: 100px;
            background: #222;
            font-size: 32px;
            color: hsla(0,0%,100%,.5);      
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
.bounce-enter-active {
    animation: bounce-in .3s;
}
.bounce-leave-active {
    animation: bounce-in .3s reverse;
}                  
@keyframes bounce-in {
    0% {
        transform: translate3d(0, 100%, 0)
        opacity 0
    }
    100% {
        transform: translate3d(0, 0, 0)
        opacity 1
    }
}
</style>

