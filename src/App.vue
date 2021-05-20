<template>
  <div id="app">
    <Tabs v-if="$route.meta.show" />
    <transition
      enter-active-class="animate__fadeInLeftBig"
      leave-active-class="animate__fadeInRight"
    >
      <router-view></router-view>
    </transition>
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
@import "./assets/css/reset.css";
@import "./assets/css/iconfont.css";
@import "./assets/css/element.css";
@import "./assets/css/global.scss";
</style>
