import {getLyric} from 'api/song'
import {Base64 } from 'js-base64'

export default class singerDetails {
    constructor({id,mid,singer,name,album,duratin,image,url}) {
        this.id = id                //歌曲id
        this.mid = mid              //歌曲mid
        this.singer = singer        //歌手名字
        this.name = name            //歌曲名称
        this.album = album          //专辑名称
        this.duratin = duratin      //歌曲长度
        this.image = image          //歌曲图片
        this.url = url              //歌曲播放路径
    }

    // 获取歌词
    getLyric() {
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }
        return new Promise((resolve,reject)=> {
            getLyric(this.mid).then( res => {
                this.lyric = Base64.decode(res.data.lyric) 
                resolve(this.lyric)
            })
        }) 
    }
}

// 拓展工厂方法
export function  createSong(musicData) {
    return new singerDetails({
        id:musicData.songid,
        mid:musicData.songmid,
        singer:filter(musicData.singer),
        name:musicData.songname,
        album:musicData.albumname,
        duratin:musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=7922575440&vkey=3E1B2A3AB5BF3379B5762D7AFE493DBB9A72C10693E9689016897F39D3F664A28BC12ABE14DE680CB35DCAC16209B247A8309B0DBDEC4B25&uin=0&fromtag=38`
    })
}                                                 

// 歌手单独处理
 function filter(singerName) {
    let ret = []
    if (!singerName) {
        return ''
    }
    singerName.forEach(item => {
        ret.push(item.name)
    })
    return ret.join('/')
}