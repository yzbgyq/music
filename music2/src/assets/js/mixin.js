// 解决迷你播放器底部高度问题
import {mapGetters} from 'vuex'

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