// 定义修改的操作
import * as types from './mutations-type'
 const matutaions = {
    [types.SINGER](state,singer){
        state.singer = singer
    },
    [types.PLAYING](state,playing){
        state.playing = playing
    },
    [types.FULLSREEN](state,fullScreen){
        state.fullScreen = fullScreen
    },
    [types.PLAYLIST](state,playlist){
        state.playlist = playlist
    },
    [types.SEQUENCELIST](state,sequenceList){
        state.sequenceList = sequenceList
    },
    [types.MODE](state,mode){
        state.mode = mode
    },
    [types.CURRENTINDEX](state,currentIndex){
        state.currentIndex = currentIndex
    },


}

export default matutaions