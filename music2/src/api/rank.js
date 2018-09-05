import {commonParams,options} from './conf'
import jsonp from 'js/jsonp'
import axios from 'axios'


export async function getRank() {
    const data = Object.assign({},{
        page: 'index',
        format: 'html',
        tpl: 'macv4',
        v8debug: 1,
    })
   const res = await axios.get('/api/getRank',{
        params:data
    })
    if (!!res.data.data) {
        let newData = res.data.data.slice(14,-1)
        let newData2 = JSON.parse(newData)
        return Promise.resolve(newData2[0])
    }
}


// 排行榜列表数据
export async function getRankList(topid) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
    const data = Object.assign({},commonParams,{
        tpl: 3,
        page: 'detail',
        type: 'top',
        platform: 'h5',
        needNewCode: 1,
        topid
    })
    return jsonp(url,data,options)
}