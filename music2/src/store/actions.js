// 在一个动作中多次去改变mutation，
// 比如一个点击事件中多次去操作mutations，
// 往往去封装一个actions
import {saveSearch,delectSearch,delectSearchAll,savePlay,iLikeSongFun,deleteLike} from 'js/cache'
import * as types from './mutations-type'
import {playMode} from 'js/config'
import {shuffle} from 'js/utils'

function findIndex(list, song) {
    return list.findIndex((item) => {
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
export const insertSong = function({commit,state},song) {
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    // 记录下当前歌曲
    let currentSong = playlist[currentIndex]
    // 看看这首歌有没有在列表里面，查找当前列表中是否有待插入的歌曲并返回其索引
    let fpIndex = findIndex(playlist,song)
    currentIndex++
    playlist.splice(currentIndex,0,song)
    if (fpIndex > -1) {  //说明列表有歌曲,把它从列表中删除
        // 如果插入的序号大于列表中的序号
        if (currentIndex > fpIndex) {
            playlist.splice(fpIndex,1)
            currentIndex--
        } else {
            playlist.splice(fpIndex + 1,1)
        }
    } 

    let currentSindex = findIndex(sequenceList,currentSong) + 1
    let fsIndex = findIndex(sequenceList,song)
    sequenceList.splice(currentSindex,0,song)
    if (fsIndex > -1) {
        if (currentSindex > fsIndex) {
            sequenceList.splice(fsIndex,1)
        } else {
            sequenceList.splice(fsIndex+1,1)
        }
    }

    commit(types.PLAYLIST,playlist)
    commit(types.SEQUENCELIST,sequenceList)
    commit(types.CURRENTINDEX,currentIndex)
    commit(types.FULLSREEN,true)               
    commit(types.PLAYING,true) 
}

// 搜索历史
export const saveSearchHistory = function ({commit},query) {
    commit(types.SEARCHCACHE,saveSearch(query))
}

// 删除搜索历史
export const delectSearchHistory = function({commit},query) {
    commit(types.SEARCHCACHE,delectSearch(query))
}

// 删除全部搜索历史
export const delectSearchHistoryAll = function({commit}) {
    commit(types.SEARCHCACHE,delectSearchAll())
}


// 删除播放列表单条音乐
export const deleteSong = function ({commit,state},song) {
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    const pIndex = findIndex(playlist,song)
          playlist.splice(pIndex,1)
    const sIndex = findIndex(sequenceList,song)
          sequenceList.splice(sIndex,1)
    if (currentIndex > pIndex || currentIndex == playlist.length) {
        currentIndex--
    }      
    commit(types.PLAYLIST,playlist)
    commit(types.SEQUENCELIST,sequenceList)
    commit(types.CURRENTINDEX,currentIndex)
    // if (!playlist.length) {
    //     commit(types.PLAYING,false)
    // } else {
    //     commit(types.PLAYING,true)
    // }
    const playingState = playlist.length > 0
    commit(types.PLAYING,playingState)
}


// 删除播放列表全部音乐
export const deleteSongAll = function({commit}) {
    commit(types.PLAYLIST,[])
    commit(types.SEQUENCELIST,[])
    commit(types.CURRENTINDEX,-1)
    commit(types.PLAYING,false)
}

// 播放历史列表
export const savePlayHistory = function({commit},song) {
    commit(types.PLAYHISTORY,savePlay(song))
}

// 点击加入收藏的
export const iLikeSong = function ({commit},song) {
    commit(types.ILIKESONGS,iLikeSongFun(song))
}

// 点击取消收藏
export const deleteLikes = function({commit},song) {
    commit(types.ILIKESONGS,deleteLike(song))
}