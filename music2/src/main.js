import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import vConsole from 'vconsole'

import 'babel-polyfill'
Vue.config.productionTip = false

import 'styles/reset.css'  //清除默认样式
import 'styles/border.css'  //1像素边框
import 'styles/icon.styl' // 字体图标
import 'mint-ui/lib/style.css';
import VueWechatTitle from 'vue-wechat-title'
// 解决300毫秒延时
import FastClick from 'fastclick'
FastClick.attach(document.body);
Vue.use(VueWechatTitle)


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
