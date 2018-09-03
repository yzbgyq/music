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