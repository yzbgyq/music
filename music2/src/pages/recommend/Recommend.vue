<template>
    <div class="recommend-warpper" ref="recommend">
        <Scroll :data='recommendList' class='recommend' ref='scroll'>
            <div>
                <RecommendSwiper :swiperList='recommend.slider'/>
                <RecommendTitle/>
                <RecommendList :recommendList='recommendList' @recommendMusic='recommendMusic'/>
            </div>
        </Scroll>
        <router-view/>
    </div>
</template>

<script>
import RecommendSwiper from './components/RecommendSwiper'
import RecommendTitle from './components/RecommendTitle'
import RecommendList from './components/RecommendList'
import Scroll from 'pages/other/Scroll'
import * as recommendApi from 'api/recommend';
import Singer from 'js/singerClass'
import axios from 'axios'
import {mapMutations} from 'vuex'
import {playlistMixin} from 'js/mixin'
export default {
    mixins:[playlistMixin],
    name:'Recommend',
    components: {
        RecommendSwiper,
        RecommendTitle,
        RecommendList,
        Scroll,
    },
    
    data() {
        return {
            recommend: [],
            recommendList:[]
        }
    },

    created() {
        this._getRecommend()
        this._getRecommendList()
    },
    methods: {
        
        // 获取轮播图
        async _getRecommend() {
           const res = await recommendApi.getRecommendSwiper()
            this.recommend = res.data
        },

        // 获取歌单列表
        async _getRecommendList() {
          const res = await recommendApi.getRecommendList()
                this.recommendList = res
        },
        
        // 获取热门歌单推荐
        recommendMusic(val) {
            this.setInfoMusic(val)
            this.$router.push({path:`/recommend/${val.dissid}`})
        },
        
        ...mapMutations({
            setInfoMusic:'MUSICDESC'
        }),

        handlePlaylist(playlist) {
            const bottom = playlist.length > 0 ? '60px' : 0
            this.$refs.recommend.style.bottom = bottom
            this.$refs.scroll.refresh()
        }
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
