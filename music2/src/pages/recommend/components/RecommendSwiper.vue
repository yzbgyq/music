<template>
    <div class='swiper-warpper'>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for='val in swiperList' :key='val.id'><img  @click='banner(val.linkUrl)' :src="val.picUrl" ></mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem, Lazyload  } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(Lazyload);
export default {
    name:'Swiper',
    props:['swiperList'],
    methods: {
        banner(url) {
            window.location.href = url
        },

    }
}
</script>

<style lang="stylus" scoped>
.swiper-warpper >>> .mint-swipe-indicator
    width: 14px
    height: 14px
.swiper-warpper >>> .mint-swipe-indicator.is-active
    width 30px
    border-radius 10px
    background #fff
    opacity .6
.swiper-warpper
    height 0
    overflow hidden
    padding-bottom 40%
    .mint-swipe
        height 300px
        img
            width 100%
            display block
</style>
