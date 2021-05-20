<template>
  <div :id="elId" ref="myChart" class="myChart"></div>
</template>

<script>
import { debounce } from "@/utils/common.js";
export default {
  name:"charts",
  props: {
    option: null,
    isShow: {
      type: Boolean,
      default: true
    },
    clickEvent: {//点击事件
      type: Function
    },
    mouseleaveEvent: {//移除事件
      type: Function
    },
    mouseoverEvent:{//鼠标移入事件
      type: Function
    }
  },
  data() {
    return {
      elId: "",
      myChart: null,
      sidebarElm: null
    };
  },
  watch: {
    option: {
      handler() {
        if(this.myChart) this.myChart.dispose();
        this.drawChart();
      },
      deep: true,
    },
    isShow: {
      handler(newVal) {
        if (newVal) {
          this.myChart.resize();
          this.drawChart();
        }
      }
    }
  },
  created() {//随机id
    this.elId = parseInt(new Date().getTime() * (Math.random() * 1000));
    this.drawChart();
  },
  mounted() {
    this.resizeHandler = debounce(() => {
      if (this.myChart) {
        this.myChart.resize();
      }
    }, 100);
  },
  methods: {
    // 绘制图表
    drawChart() {
      this.$nextTick(() => {
        let element = document.getElementById(this.elId);
        //创建图表
        this.myChart = this.$echarts.init(element);
        window.addEventListener("resize", this.resizeHandler);

        this.sidebarElm = document.getElementsByClassName("asideClass")[0];
        this.sidebarElm && this.sidebarElm.addEventListener(
            "transitionend",
            this.sidebarResizeHandler
          );

        this.myChart.setOption(this.option,true);
        // if (this.clickEvent) {
          this.myChart.on("mouseover", this.mouseoverEvent);
          this.myChart.on("click", this.clickEvent);
          this.myChart.on("mouseout", this.mouseleaveEvent);
        // }
      });
    },
    sidebarResizeHandler(e) {
      if (e.propertyName === "width") {
        this.resizeHandler();
      }
    }
  },
  beforeDestroy() {
    if (this.myChart) {
      //销毁图表实例
      this.myChart.dispose();
    }
    window.removeEventListener("resize", this.resizeHandler);
    this.sidebarElm && this.sidebarElm.removeEventListener("transitionend", this.sidebarResizeHandler);
  }
};
</script>
<style scoped>
.myChart {
  width: 100%;
  height: 100%;
}
</style>
