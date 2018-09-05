import {commonParams,options} from './conf'
import jsonp from 'js/jsonp'
import axios from 'axios'


// 热门搜索关键字
export async function getHotKey() {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
    const data = Object.assign({},commonParams,{
        platform: 'h5',
        needNewCode: 1,
    })
    return jsonp(url,data,options)
}

// 输入框搜索
export async function searchs(w,page=1,zhida=0) {
    
    const data = Object.assign({},commonParams,{
            w,
            p: page,   //第几页
            catZhida: zhida ? 1 : 0 ,
            zhidaqu: 1,
            t: 0,
            flag: 1,
            ie: 'utf-8',
            uid:0,
            sem: 1,
            aggr: 0,
            perpage: 20,
            notice: 0,
            platform: 'h5',
            needNewCode: 1,
            n: 20,
            remoteplace: 'txt.mqq.all'
    })
    const res = await axios.get('/api/search',{
        params: data
    })
    const datas = res.data.data.slice(9,-1)
    return Promise.resolve(JSON.parse(datas))
    
}
