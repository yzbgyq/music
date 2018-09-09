<template>
        <div>
            <transition name="bounce">
                <div class="box" v-show="isShow">
                    <h1 class="title">{{title}}</h1>
                    <ul class="border-top">
                        <li class="border-right" @click="ok">确定</li>
                        <li @click="isShow = false">取消</li>
                    </ul>
                </div>
            </transition> 
             <transition name="fade">
                <div class="comfin" v-show="isShow"></div>
             </transition>
        </div>


</template>

<script>
export default {
    props:{
        title: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            isShow: false
        }
    },

    methods: {
        showComf() {
            this.isShow = true
        },

        ok() {
            this.$emit('ok')
            this.isShow = false
        }
    }
}
</script>
<style lang="stylus" scoped>
    .box
        width 70%
        margin auto
        border-radius 15px
        background #fff
        position fixed
        left 50%
        top 40%
        margin-left -35%
        z-index 99999
        .title
            color #000
            font-size 34px
            text-align center
            height 150px
            line-height 150px
        ul
            display flex
            justify-content space-between
            height 80px
            line-height 80px
            li
                flex 1
                text-align center
                font-size 34px
    .comfin
        position fixed
        top 0
        left 0
        bottom 0
        right 0
        width 100%
        height 100%
        z-index 99998
        background rgba(0,0,0,.6)            
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
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
</style>