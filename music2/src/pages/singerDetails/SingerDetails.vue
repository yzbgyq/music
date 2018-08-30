<template>
<transition name='bounce'>
        <SingerInformation :songs='songs' :title='title' :bgImg='bgImg'/>
</transition>
</template>

<script>
import { getSingerDetail } from 'api/singer'
import {mapGetters} from 'vuex'
import { createSong } from 'js/singerDetailsClass'
import SingerInformation from 'other/SingerInformation'
export default {
    name:'singerDetails',
    computed: {
        ...mapGetters(['singer']),
        title() {
            return this.singer.name
        },
        bgImg() {
           return this.singer.avatar 
        }
    },
    components: {
        SingerInformation
    },
    data() {
        return {
            songs:[]
        }
    },
    methods: {
        async _getSingerDetail() {
            if (!this.singer.id) {  //如果没有这个id，就返回上一页
                this.$router.go(-1)
            }
            const res = await getSingerDetail(this.singer.id)
            if (res.code == 0) {
                this.songs = this.normalize(res.data.list)
            }
        },
        // 处理歌手数据方法
        normalize(list) {
            let ret = []
            list.forEach(item => {
                let { musicData } = item
                if (musicData.songid && musicData.albumid) {
                    ret.push(createSong(musicData))
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
  @import '~styles/varibles.styl'
    .singer-details
        position fixed
        z-index 100
        top 0
        left 0
        right 0
        bottom 0
        background $color-background 
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
