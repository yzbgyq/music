<template>
    <!-- 歌手的歌曲列表组件 -->
     <div class="song-list">  
         <ul>
             <li v-for="(val,index) of songs" :key="index" @click='selectItem(val,index)'>
                 <div class="rank" v-if="isRank">
                     <span :class="iconClass(index)">{{iconText(index)}}</span>
                 </div>
                 <div class="content">
                     <h2 class="name" v-html="val.name"></h2>
                     <p class="desc" v-html="getDesc(val)"></p>
                 </div>
             </li>
         </ul>
     </div>
</template>

<script>
export default {
    props: {
        songs:{
            type:Array,
            default:[]
        },
        isRank:{
            type: Boolean,
            default: false
        }
    },
    methods: {
        getDesc(val) {
            return `${val.singer} 。${val.album}`
        },

        selectItem(val,index) {
            // 事件派发给父组件
            this.$emit('select',val,index)
        },
        
        iconClass(index) {
            if (index <=2 ) {
                return `icon icon${index}`
            } else {
                return `text`
            }
        },
        
        iconText(index) {
            if (index > 2) {
                return index
            }
        }
    },

}
</script>

<style lang="stylus" scoped>
@import '~styles/mixin.styl'
@import '~styles/varibles.styl'
    li
        display: flex
        align-items: center
        box-sizing: border-box
        height: 128px
        font-size: 28px
        .content
            flex: 1
            line-height: 40px
            overflow: hidden
            .name
                ellipsis()
                color: #fff
            .desc
                ellipsis()
                margin-top: 8px
                color $color-text-d
        .rank
            flex 0 0 50px
            width 50px
            margin-right 50px
            text-align center
            .icon
                display inline-block
                width 50px
                height 48px
                background-size: 50px 48px
                &.icon0
                    bg-image('first')
                &.icon1
                    bg-image('second')    
                &.icon2
                    bg-image('third')
            .text
                color: #ffcd32
                font-size: 36px
            

</style>

