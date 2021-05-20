<template functional>
  <div class="tips">
    <slot />
  </div>
</template>

<script>
export default {
  name: "noData",
};
</script>

<style scoped>
.tips {
  color: #dcdcdc;
  font-size: 14px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%);
}
</style>