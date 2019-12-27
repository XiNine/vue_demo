<template>
  <div id="app">
    <Tabs/>
    <router-view/>
  </div>
</template>

<script>
import Tabs from '@/components/Tabs.vue'
export default{
  components:{
    [Tabs.name]:Tabs
  }
}
</script>

<style lang="scss">
@import "../public/css/global.scss"
</style>

