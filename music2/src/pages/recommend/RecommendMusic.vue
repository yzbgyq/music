<template>
 <transition name='bounce'>
        <SingerInformation :songs='songs'  :title='title' :bgImg='bgImg'/>
</transition>
</template>

<script>
import SingerInformation from 'other/SingerInformation'
import { getRecommendMusic } from 'api/recommend'
import {mapGetters} from 'vuex'
import { createSong } from 'js/singerDetailsClass'

export default {
    components: {
        SingerInformation
    },
    computed: {
        ...mapGetters(['musicDesc']),
        title() {
            return this.musicDesc.dissname
        },
        bgImg() {
           return this.musicDesc.imgurl 
        }
    },
    
    data() {
        return {
            songs:[]
        }
    },
    methods: {
        async _getSingerDetail() {
            if (!this.musicDesc.dissid) {  //如果没有这个id，就返回上一页
                this.$router.go(-1)
            }
            getRecommendMusic(this.musicDesc.dissid).then(res => {
                this.songs = this.normalize(res.songlist)
                
            })
       
        },
        // 处理歌手数据方法
        normalize(list) {
            let ret = []
            list.forEach(item => {

                if (item.songid && item.albumid) {
                    ret.push(createSong(item))
                }
            });
            return ret
        }
    },
    created() {
        this._getSingerDetail()
    },
}
</script>

<style lang="stylus" scoped>
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

