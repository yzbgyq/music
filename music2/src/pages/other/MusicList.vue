<template>
    <!-- 歌手的歌曲列表组件 -->
     <div class="song-list">  
         <ul>
             <li v-for="(val,index) of songs" :key="val.id" @click='selectItem(val,index)'>
                 <div class="content">
                     <h2 class="name">{{val.name}}</h2>
                     <p class="desc">{{getDesc(val)}}</p>
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
        }
    },
    methods: {
        getDesc(val) {
            return `${val.singer} 。${val.album}`
        },
        selectItem(val,index) {
            // 事件派发给父组件
            this.$emit('select',val,index)
        }
    }
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
</style>

