<template>
    <div class="recommend-warpper">
        <Scroll :data='recommendList' class='recommend' ref='scroll'>
            <div>
                <RecommendSwiper :swiperList='recommend.slider'/>
                <RecommendTitle/>
                <RecommendList :recommendList='recommendList'/>
            </div>
        </Scroll>
    </div>
</template>

<script>
import RecommendSwiper from './components/RecommendSwiper'
import RecommendTitle from './components/RecommendTitle'
import RecommendList from './components/RecommendList'
import Scroll from 'pages/other/Scroll'
import { getRecommendSwiper, getRecommendList } from 'api/recommend'
import axios from 'axios'
export default {
    name:'Recommend',
    components: {
        RecommendSwiper,
        RecommendTitle,
        RecommendList,
        Scroll
    },
    data() {
        return {
            recommend: [],
            recommendList:[]
        }
    },

    created() {
      // setTimeout(() => {})
        this._getRecommend()
        this._getRecommendList()
    },
    methods: {
        // 获取轮播图
        async _getRecommend() {
           const res = await getRecommendSwiper()
            this.recommend = res.data
        },
        // 获取歌单列表
        async _getRecommendList() {
          const res = await getRecommendList()
                this.recommendList = res
        },
        // loadImg() {   // 图片加载完了再调用refresh重新高度
        //   console.log('f');
        //   this.$refs.scroll.refresh()
        // }
    }
}
</script>
<style lang="stylus" scoped>
.recommend-warpper
  position: fixed;
  width: 100%;
  top: 176px;
  bottom: 0;
  .recommend
    height: 100%
    overflow: hidden
</style>
