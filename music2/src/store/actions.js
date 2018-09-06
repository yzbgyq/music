// 在一个动作中多次去改变mutation，
// 比如一个点击事件中多次去操作mutations，
// 往往去封装一个actions
import * as types from './mutations-type'
import {playMode} from 'js/config'
import {shuffle} from 'js/utils'

function findIndex(list,song) {
    return list.findIndex(item => {
        return item.id === song.id
    })
}
// 选择播放一首音乐
export const selectPlay = function({commit,state},{list,index}) {
    if (state.mode === playMode.random) {
        let randomList = shuffle(list)
        commit(types.PLAYLIST,randomList)        // 歌曲的随机列表
        index = findIndex(randomList,list[index])
    } else {
        commit(types.PLAYLIST,list)                 // 歌曲的顺序列表
    }
    commit(types.SEQUENCELIST,list)             // 播放的歌曲列表，顺序列表
    commit(types.FULLSREEN,true)                //打开全屏
    commit(types.PLAYING,true)                  //播放状态
    commit(types.CURRENTINDEX,index)            //当前播放的歌曲下标
}

// 随机播放一首音乐
export const randomPlay = function({commit},{list}) {   
    commit(types.MODE,playMode.random)          //设置随机播放
    commit(types.SEQUENCELIST,list)             //播放的歌曲列表，顺序列表
    commit(types.PLAYLIST,shuffle(list))        //歌曲的随机列表
    commit(types.FULLSREEN,true)                //打开全屏
    commit(types.PLAYING,true)                  //播放状态
    commit(types.CURRENTINDEX,0)                //当前播放的歌曲下标
}

// 播放搜索的音乐