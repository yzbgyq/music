import Vue from 'vue'
import Router from 'vue-router'
const Recommend = resolve => {
    import('pages/recommend/Recommend').then(res => {
      resolve(res)
    })
}
const Rank = resolve => {
  import('pages/rank/Rank').then(res => {
    resolve(res)
  })
}
const Search = resolve => {
  import('pages/search/Search').then(res => {
    resolve(res)
  })
}
const Singer = resolve => {
  import('pages/singer/Singer').then(res => {
    resolve(res)
  })
}
const SingerDetails = resolve => {
  import('pages/singerDetails/SingerDetails').then(res => {
    resolve(res)
  })
}
const RecommendMusic = resolve => {
  import('pages/recommend/RecommendMusic').then(res => {
    resolve(res)
  })
}
const RankList = resolve => {
  import('pages/rank/RankList').then(res => {
    resolve(res)
  })
}
const User = resolve => {
  import('pages/user/User').then(res => {
    resolve(res)
  })
}
// import Recommend from 'pages/recommend/Recommend'
// import Rank from 'pages/rank/Rank'
// import Search from 'pages/search/Search'
// import Singer from 'pages/singer/Singer'
// import SingerDetails from 'pages/singerDetails/SingerDetails'
// import RecommendMusic from 'pages/recommend/RecommendMusic'
// import RankList from 'pages/rank/RankList'
// import User from 'pages/user/User'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/',redirect:'/recommend',meta:{title:'推荐'}},
    { path: '/recommend',name: 'Recommend',component: Recommend,children:[{path:':id',component:RecommendMusic}]},
    { path: '/singer',name: 'Singer',component: Singer,meta:{title:'歌手'},children:[{path:':id',component:SingerDetails}]},
    { path: '/rank',name: 'Rank',component: Rank,meta:{title:'排行'},children:[{path:':id',component:RankList}]},
    { path: '/search',name: 'Search',component: Search,meta:{title:'搜索'},children:[{path:':id',component:SingerDetails}]},
    { path: '/user',name: 'User',component: User,meta:{title:'个人中心'}},
    { path: '*',redirect:'/'}
  ]
})
