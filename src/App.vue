<template>
  <div id="app">
    <Tabs />
    <router-view />
  </div>
</template>

<script>
import Tabs from "@/components/Tabs";
export default {
  components: {
    Tabs
  }
};
</script>

<style lang="scss">
@import "./static/css/global.scss";
@import "./static/css/reset.css";
</style>
