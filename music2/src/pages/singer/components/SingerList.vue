<template>
<div class="singer-warpper">
  <Scroll :data='data' class='recommend' ref='scroll' :listenScroll='listenScroll' @scroll='scroll' :probeType='probeType'>
      <ul class="ul">
          <li v-for="(group,key) in data" :ref='group.title' :key="key" class="list-group">
              <h2 class="list-title">{{group.title}}</h2>
              <ul>
                  <li  :key="item.name" v-for="item of group.singerList" class="list-group-item" @click='items(item)'>
                      <div class="avatar-name"><img v-lazy="item.avatar" class="avatar"></div>
                      <div class="name">{{item.name}}</div>
                  </li>
              </ul>
          </li>
      </ul>
          <!-- 滚动顶部定位 -->
    <div class="list-fixed" v-show="fixedTitle" ref='fixed'>
        <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <div class="loading" v-show="!data.length">
        <Loading/>
    </div>
    </Scroll>

  </div>

</template>

<script>
import Scroll from 'pages/other/Scroll'
import Loading from 'pages/other/BaseLoading'
import {mapMutations} from 'vuex'
export default {
  props: ['data','letterIndexTxt'],
  data() {
    return {
      touchStatus:false,  //滑动标识符
      listenScroll:true,      //监听scroll的滚动事件
      probeType:3,    //滚动不节流
      heightArr:[], // 用来装每个区间的高度
      scrollY:-1,
      fixedTitle:'',
      diff:-1
    }
  },
  components: {
    Scroll,
    Loading
  },
  computed: {
    letter() {
      return this.data.map( item => {
        return item.title
      })
    },
  },
  methods: {
    items(item) {
      this.setSinger(item)
      this.$router.push({path:`/singer/${item.id}`})
    },
    // 监听滚动事件
    scroll(pos) {
      this.scrollY = pos.y
    },
    listHeight() {  //计算每个区间的高度
      let height = 0
      this.heightArr.push(height)
        for(let k in this.$refs) {
          if (this.$refs[k][0]) {
            let item = this.$refs[k][0]
            height += item.clientHeight
            this.heightArr.push(height)
          }
        }

    },
    ...mapMutations({
      setSinger:'SINGER'
    })
  },
  mounted() {
    
  },
  watch: {
    data() {
      setTimeout(() => {
          this.listHeight()
      },20)
    },
    letterIndexTxt() {
      if (this.letterIndexTxt) {  //右边组件传递过来的字母
        const element = this.$refs[this.letterIndexTxt][0]
        this.$refs.scroll.scrollToElement(element,300)
      }
    },
    scrollY(newY) {
      if (newY > 0) {
        this.fixedTitle = ''
      }
      let heightArr = this.heightArr
      for(let i = 0; i < heightArr.length; i++) {
        let height1 = heightArr[i]
        let height2 = heightArr[i+1]
        if (-newY >= height1 && -newY < height2) {
          if (this.letter[i]) {
              this.$emit('indexTxt',this.letter[i])
              this.fixedTitle = this.letter[i]
              this.diff = height2 + newY
          }
          return
        }
      }
    },
    diff(newVal) {
      let fixedTop = (newVal > 0 && newVal < 30) ? newVal - 30 : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  }

}
</script>

<style scoped lang="stylus">
@import "~styles/varibles"
.singer-warpper
  position: absolute;
  width: 100%
  top: 176px
  bottom: 0
  .recommend
    height: 100%
    overflow: hidden
    position: relative;
    .ul
      .list-group
           padding-bottom 40px
           .list-title
             height: 60px;
             line-height: 60px;
             padding-left: 40px;
             font-size: 24px;
             color: $color-text-l;
             background: #333;
          .list-group-item
              display flex
              align-items center
              padding 40px 0 0 60px
              .avatar-name
                  width 100px
                  height 100px
                  flex 0 0 100px
                  .avatar
                      width 100px
                      height 100px
                      border-radius 50%
              .name
                  color $color-text-l
                  font-size 28px
                  flex 1
                  margin-left 40px
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%  
      background #fff
      .fixed-title
          height: 60px;
          line-height: 60px;
          padding-left: 40px;
          font-size: 24px;
          color: $color-text-l;
          background: #333;
    .loading
      position: absolute
      top: 40%
      left: 50%
      width 100%
      transform translate(-50%,-50%)
</style>
