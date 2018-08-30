// 对state做一些映射
export const singer = state => state.singer
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
// 担任计算属性作用
export const currentSong = (state) => { //当前播放的下标对应的那首歌曲
    return state.playlist[state.currentIndex] || {}
}





