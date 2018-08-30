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
        url: `http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=2327889562&vkey=B3164E67B9C09EDC6915B451D3BABD7331733CC44021C7787E8FD583ECFCA00309848B5B200D37EAEE0E8B973E44C1AC7E888267DC9C1309&uin=0&fromtag=38`
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