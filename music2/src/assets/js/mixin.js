// 解决迷你播放器底部高度问题
import {mapGetters,mapMutations,mapActions} from 'vuex'
import {shuffle} from 'js/utils'
import {playMode} from 'js/config'

export const playlistMixin = {
    computed: {
      ...mapGetters(['playlist'])
    },

    mounted() {
      this.handlePlaylist(this.playlist)
    },

    activated() {
      this.handlePlaylist(this.playlist)
    },

    watch: {
      playlist(newVal) {
        this.handlePlaylist(newVal)
      }
    },

    methods: {
      handlePlaylist() {
        throw new Error('component must implement handlePlaylist method')
      }
    }
  }

export const playMixin = {
    computed: {
      ...mapGetters(['mode','sequenceList']),
      // 播放模式，按钮样式
      iconMode() {
        return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
      }
    },

    methods: {
      // 播放模式的样式切换
      changeMode() {
        const mode = (this.mode + 1) % 3
        this.setMode(mode)
        let list = null
        
        if (mode === playMode.random) {
            // 洗牌
            list = shuffle(this.sequenceList)
        } else {
            list = this.sequenceList
        }
        this.restCurrentIndex(list)
        this.setplayList(list)
    },
    // 当播放模式发生改变的时候
    restCurrentIndex(list) {
      let index = list.findIndex(item => {
          return item.id == this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    ...mapMutations({
      setPlaylist:'PLAYING',
      setplayList:'PLAYLIST',
      setMode:'MODE',
    })
    }
  }

export const searchMixin = {
  data() {
    return {
      query: ''
    }
  },
  computed: {

  },

  methods: {
    ...mapActions(['saveSearchHistory']),
    
    // 保存搜索结果到缓存
    saveSearch() {
        this.saveSearchHistory(this.query)
    },

    
  }
}