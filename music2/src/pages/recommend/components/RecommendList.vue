<template>
        <ul>
            <li v-for="val of HandleRecommendList" :key="val.dissid">
                <img  v-lazy="val.imgurl">
                <div class="text">
                    <h2 v-html="val.name"></h2>
                    <p v-html="val.dissname"></p>
                </div>
            </li>
            <div class="" v-show="!HandleRecommendList.length">
                <Loading/>
            </div>
        </ul>
</template>

<script>
import Loading from 'pages/other/BaseLoading'
export default {
    name:'List',
    props: ['recommendList'],
    data () {
        return {

        }
    },
    components: {
      Loading
    },
    computed: {
        // 处理处出我想要的数据,推荐歌曲列表
        HandleRecommendList() {
            let HandleRecommendList = []
            if (this.recommendList && this.recommendList.length) {
                this.recommendList.forEach( item => {
                    HandleRecommendList.push({
                        dissname:item.dissname,//专辑名称
                        dissid:item.dissid, //专辑id
                        imgurl:item.imgurl, // 图片
                        name:item.creator.name //专辑的作者
                    })
                })
            }
            return HandleRecommendList
        }
    },
    methods: {

    }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
    ul
        background $color-background
        li
            display: flex;
            box-sizing: border-box
            align-items: center
            padding: 0 40px 40px
            img
                flex: 0 0 120px
                width: 120px
                padding-right: 40px
            .text
                display: flex
                flex-direction: column
                justify-content: center
                flex: 1
                line-height: 40px
                overflow: hidden
                font-size: 28px
                h2
                    margin-bottom: 20px
                    color: #fff
                p
                    color $color-text-d

</style>
