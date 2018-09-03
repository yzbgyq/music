<template>
    <div ref="warpper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    data: {
      type: Array,
      default: null
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      //监听scroll滚动
      type: Boolean,
      default: false
    }
  },
  methods: {
    init() {
      if (!this.$refs.warpper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.warpper, {
        probeType: this.probeType,
        click: this.click
      });
      if (this.listenScroll) {
        //滚动事件触发
        const that = this; //pos 指的是滚动到的位置
        this.scroll.on("scroll", pos => {
          that.$emit("scroll", pos);
        });
      }
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    }
  },
  mounted() {
    setTimeout(() => {
      //确保在dom初始化后才执行滚动方法
      this.init();
    }, 20);
  },
  watch: {
    data() {
      //监听传入进来的data数据的变化，重新就算高度
      setTimeout(() => {
        this.refresh();
      }, 20);
    }
  }
};
</script>

<style>
</style>
