<template>
  <div id="scroll-wrap">
    <div
      class="scroll-content"
      v-for="item in data"
      :key="item.id"
      :style="{ top }"
      @mouseenter="Stop"
      @mouseleave="Up"
    >
      <slot name="main" :item="item" />
    </div>
  </div>
</template>

<script>
export default {
  name: "roll",
  props: {
    data: Array,
    height: Number,
  },
  data() {
    return {
      activeIndex: 0,
      time: null,
    };
  },
  computed: {
    top() {
      return `${-this.activeIndex * this.height}px`;
    },
  },
  mounted() {
    this.scrollUp();
  },
  methods: {
    scrollUp() {
      this.time = setInterval(() => {
        if (this.activeIndex < this.data.length) {
          this.activeIndex += 1;
        } else {
          this.activeIndex = 0;
        }
      }, 1500);
    },

    Stop() {
      clearInterval(this.time);
    },

    Up() {
      this.scrollUp();
    },
  },
};
</script>

<style lang="scss" scoped>
#scroll-wrap {
  height: 100%;
  overflow: hidden;
  .scroll-content {
    position: relative;
    transition: top 0.5s;
  }
}
</style>