  // 歌词的获取
import {commonParams} from './conf'
import axios from 'axios'
export function getLyric(mid) {
    const url = '/api/lyric'
    const data = Object.assign({}, commonParams, {
      g_tk: 5381,
      songmid: mid,
      platform: 'yqq',
      hostUin: 0,
      needNewCode: 0,
      categoryId: 10000000,
      pcachetime: +new Date(),
      format: 'json'
    })
  
    return axios.get(url, {
      params: data
    }).then((res) => {
      return Promise.resolve(res.data)
    })
  }
  