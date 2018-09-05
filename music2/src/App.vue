<template>
  <div id="app">
    <BaseHeader/>
    <BaseTab/>
    <router-view/>
    <Play/>
  </div>
</template>

<script>
import BaseHeader from 'pages/other/BaseHeader'
import BaseTab from 'pages/other/BaseTab'
import Play from 'pages/play/Play'
export default {
  name: 'App',
  components: {
    BaseHeader,
    BaseTab,
    Play,
  }
}
</script>
 
<style>

</style>