<template>
 <transition name='bounce'>
        <SingerInformation :songs='songlist'  :title='title' :bgImg='bgImg' :isRank='isRank'/>
</transition>
</template>

<script>
import SingerInformation from 'other/SingerInformation'
import { getRecommendMusic } from 'api/recommend'
import {mapGetters} from 'vuex'
import { createSong } from 'js/singerDetailsClass'
import {getRankList} from 'api/rank'
export default {
    components: {
        SingerInformation
    },
    
    computed: {
        ...mapGetters(['topList']),

        title() {
            return this.topList.ListName
        },

        bgImg() {
           if (this.songlist.length) {
               return this.songlist[0].image
           } 
        }
    },
    
    data() {
        return {
            songlist:[],
            isRank:true
        }
    },

    methods: {
        async getTopList() {
            if (!this.topList.topID) {  //如果没有这个id，就返回上一页
                this.$router.go(-1)
                return
            } 
            getRankList(this.topList.topID).then(res => {
                this.songlist = this.normalize(res.songlist)
            })
        },

        // 处理歌手数据方法
        normalize(list) {
            let ret = []
            list.forEach(item => {
                const music = item.data
                if (music.songid && music.albumid) {
                    ret.push(createSong(music))
                }
            });
            return ret
        }
    },

    created() {
        this.getTopList()
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

