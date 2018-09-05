import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'pages/recommend/Recommend'
import Rank from 'pages/rank/Rank'
import Search from 'pages/search/Search'
import Singer from 'pages/singer/Singer'
import SingerDetails from 'pages/singerDetails/SingerDetails'
import RecommendMusic from 'pages/recommend/RecommendMusic'
import RankList from 'pages/rank/RankList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/',redirect:'/recommend',meta:{title:'推荐'}},
    { path: '/recommend',name: 'Recommend',component: Recommend,children:[{path:':id',component:RecommendMusic}]},
    { path: '/singer',name: 'Singer',component: Singer,meta:{title:'歌手'},children:[{path:':id',component:SingerDetails}]},
    { path: '/rank',name: 'Rank',component: Rank,meta:{title:'排行'},children:[{path:':id',component:RankList}]},
    { path: '/search',name: 'Search',component: Search,meta:{title:'搜索'}},
    { path: '*',redirect:'/'}
  ]
})
