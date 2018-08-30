<template>
  <div class="navright">
        <div class="nav-item"  :class="activeIndex==val?'active':''" v-for="(val,index) in letter" :key="index"
          @touchstart.prevent="touchstat"
          @touchmove="touchmove"
          @touchend="touchend"
          :ref="val"
        >{{val}}</div>
  </div>

</template>

<script>
export default {
  name:'Rightlist',
  props: ['data','txt'],
  data() {
    return {
        touchStatus: false,  //滑动标识符
        activeIndex: '热门',   //添加class
    }
  },
  computed: {
    letter() {
            let arr = []
            for(let k in this.data) {
                arr.push(this.data[k].title)
            }
            return arr
        }
  },
  methods: {
    touchstat(e) {
      this.touchStatus = true
        this.activeIndex = e.target.innerHTML
      this.$emit('change',e.target.innerHTML)
    },
    touchmove(e) {
      if (this.touchStatus) { //手指必须先点击才能滑动
        const startY = this.$refs['热门'][0].offsetTop //第一个字母距离顶部的高度
        const touchY = e.touches[0].clientY - 88
        const index = Math.floor((touchY - startY) / 20) //当前手指滑动的位置下标
        if (this.letter[index]) {
            this.activeIndex = this.letter[index]   //设置class类名
        }
        if (index >= 0 && this.letter.length) {
          this.$emit('change',this.letter[index])
        }
      }
    },
    touchend() {
      this.touchStatus = false
    },

  },
  watch: {
    txt() {
      if (this.txt) {
        this.activeIndex = this.txt
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~styles/varibles"
.navright
  font-family: Helvetica
  position absolute
  right 20px
  top 176px
  bottom 0
  display flex
  flex-direction column
  justify-content center
  color #eee
  .nav-item
        width 40px
        height 40px
        line-height 40px
        text-align center
        font-size 30px
        overflow: hidden
  .active
      color $color-theme
</style>
