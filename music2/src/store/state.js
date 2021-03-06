import {playMode} from 'js/config'
import {loadSearch,loadPlay,getLike} from 'js/cache'
//  所有的状态管理
const state = {
    singer: {},                  // 歌手信息
    playing: false,             // 播放时候暂停
    fullScreen: false,          // 播放器是否全屏
    playlist: [],               // 点击播放后播放列表
    sequenceList: [],            // 播放的歌曲列表，顺序列表。原始列表
    mode: playMode.sequence,    // 播放模式
    currentIndex: -1,           // 当前播放的索引
    musicDesc: {},               // 首页歌单列表
    topList: {},                 // 排行榜数据
    searchCache: loadSearch(),       // 搜索缓存
    playHistory: loadPlay(),            // 播放历史
    iLikeSongs: getLike(),              // 我喜欢的歌曲收藏
}


export default state
