// 缓存
import storage from 'good-storage'
const SEARCH_KEY = '_search_'
const MAX_LENGTH = 15
const PLAY_KEY_LENGTH = 100     //100首歌曲
const PLAY_KEY = '_play_'
// 插入一条
function insertArray(arr,val,compare,maxLen) {
    const index = arr.findIndex(compare)
    if (index === 0) {
        return
    }
    if (index > 0) {
        arr.splice(index,1)
    }
    arr.unshift(val)
    if (maxLen && arr.length > maxLen) {
        arr.pop()
    }
}

// 删除一条
function delectFormArr(arr,compare) {
    const index = arr.findIndex(compare)
    if (index > -1) {
        arr.splice(index,1)
    }    
}



// 保存
export function saveSearch(query) {
    let searches = storage.get(SEARCH_KEY,[])
    insertArray(searches,query,item => {
        return item === query
    },MAX_LENGTH)

    storage.set(SEARCH_KEY,searches)
    return searches
}

export function loadSearch() {
    return storage.get(SEARCH_KEY,[])
}


// 删除单项
export function delectSearch(query) {
    let searchs = storage.get(SEARCH_KEY,[])
    delectFormArr(searchs,item => {
        return item === query
    })
    storage.set(SEARCH_KEY,searchs)
    return searchs
}

// 删除全部
export function delectSearchAll() {
    storage.remove(SEARCH_KEY)
    return []
}

// 存储播放列表
export function savePlay(song) {
    
    let songs = storage.get(PLAY_KEY,[])
    insertArray(songs,song,item => {
        return item.id == song.id
    },PLAY_KEY_LENGTH)
    storage.set(PLAY_KEY,songs)
    return songs
}

// 读取播放列表
export function loadPlay() {
    return storage.get(PLAY_KEY,[])
}