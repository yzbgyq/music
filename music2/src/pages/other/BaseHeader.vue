<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Water Music</h1>
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped lang="stylus">
  @import '~styles/varibles.styl'
  @import '~styles/mixin.styl'
  .m-header
    position: relative
    height: 88px
    text-align: center
    color: $color-theme
    font-size: 0
    background $color-background 
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 12px
      width: 60px
      height: 64px
      margin-right: 18px
      bg-image('logo')
      background-size: 60px 64px
    .text
      display: inline-block
      vertical-align: top
      line-height: 88px
      font-size: $font-size-large
      font-size: 36px;
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 24px
        font-size: 40px
        color: $color-theme
</style>
