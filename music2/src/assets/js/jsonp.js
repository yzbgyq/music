import originJsonp from 'jsonp'

export default function jsonp(url,data,options) {
    url += (!url.includes('?') ? '?' : '&') + param(data)
    return new Promise((resolve,reject) => {
        originJsonp(url,options,(err,data) => {
            if (!err) {
                resolve(data)
            } else 
            reject(err)
        })
    })
}

// 拼接url
function param(data) {
    let url = ''
    for(const k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        url += `&${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
}

