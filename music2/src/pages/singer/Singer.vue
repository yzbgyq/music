<template>
  <div>
    <SingerList :data='singerList' @indexTxt='indexTxt' :letterIndexTxt.sync='letterIndexTxt' ref="list"/>
    <SingerRight :data='singerList' @change='change' :txt='txt'/>
    <router-view/>
  </div>

</template>

<script>
import {playlistMixin} from 'js/mixin'
import { getSingerList } from 'api/singer'
import SingerList from './components/SingerList'
import SingerRight from './components/SingerRight'
import Singer from 'js/singerClass'
const HOT_NAMW = '热门'
const HOT_LEN = 10
export default {
    name:'Singer',
     mixins:[playlistMixin],
    data() {
      return {
        singerList:[],
        letterIndexTxt:'',  //传给歌手列表的滚动标识符
        txt:''
      }
    },
    components: {
      SingerList,
      SingerRight
    },
    methods: {
      // 获取歌手列表数据
      async _getSingerList() {
        const res = await getSingerList()
        this.singerList = this.normalize(res.data.list)
      },
 
      // 处理数据
      normalize(list) {
        let map = {
          hot: {
            title:HOT_NAMW,
            singerList:[]
          }
        }
        list.forEach((item,index) => {
          if (index < 10) {
            map.hot.singerList.push(new Singer({
                id:item.Fsinger_mid,
                name:item.Fsinger_name,
            }))
          }
          const key = item.Findex   //首字母
            if (!map[key]) {
              map[key] = {
                title:key,
                singerList:[]
              }
            }
            map[key].singerList.push(new Singer({
              id:item.Fsinger_mid,
              name:item.Fsinger_name,
            }))
        })

        // 为了得到有序列表，需要处理map
        let [ hot,ret,key ] = [[],[]]
            for( key in map ) {
              let val = map[key]
              if (val.title.match(/[a-zA-Z]/)) {
                ret.push(val)
              } else if(val.title === HOT_NAMW){
                hot.push(val)
              }
            }
            // 排序
            ret.sort((a,b) => {
              return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(ret)
      },
      
      // 接受传过来的字母
      change(letter) {
        this.letterIndexTxt = letter
      },

      indexTxt(txt) {
        this.txt = txt
      },

      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : 0
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      }
    },
    created() {
      this._getSingerList()
    }
}
</script>

<style lang="stylus" scoped>

</style>
