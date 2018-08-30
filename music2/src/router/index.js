import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'pages/recommend/Recommend'
import Rank from 'pages/rank/Rank'
import Search from 'pages/search/Search'
import Singer from 'pages/singer/Singer'
import SingerDetails from 'pages/singerDetails/SingerDetails'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/',redirect:'/recommend'},
    { path: '/recommend',name: 'Recommend',component: Recommend},
    { path: '/singer',name: 'Singer',component: Singer,children:[{path:':id',component:SingerDetails}]},
    { path: '/rank',name: 'Rank',component: Rank},
    { path: '/search',name: 'Search',component: Search},

  ]
})
