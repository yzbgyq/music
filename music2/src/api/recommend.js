import {commonParams,options} from './conf'
import jsonp from 'js/jsonp'
import axios from 'axios'
// 轮播图
export function getRecommendSwiper() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const data = Object.assign({},commonParams,{
        platform: 'h5',
        needNewCode: 1,
        uin: 0
    })
    return jsonp(url,data,options)
}

// 首页歌单
export async function getRecommendList() {
    const data = Object.assign({},commonParams,{
        platform:'yqq',
        hostUin:0,
        sin:0,
        ein:29,
        sortId:5,
        needNewCode:0,
        categoryId:10000000,
        rnd:Math.random(),
        format:'json'
    })
    const res = await axios.get('/api/getRecommendList',{
        params:data
    })
    if (res.data.data.data.list) {
        return Promise.resolve(res.data.data.data.list)
    }
}

// 首页歌单列表
export async function getRecommendMusic(disstid) {
    const data = Object.assign({}, commonParams, {
      disstid,
      type: 1,
      json: 1,
      utf8: 1,
      onlysong: 0,
      platform: 'yqq',
      hostUin: 0,
      needNewCode: 0, 
      jsonpCallback: 'playlistinfoCallback'
    })
    const res = await axios.get('/api/getRecommendMusic',{
        params:data
    })
    if (!!res.data.data) {
        let newData = res.data.data.slice(21,-1)
        let newData2 = JSON.parse(newData) 
        return Promise.resolve(newData2.cdlist[0])
    }
    

  }