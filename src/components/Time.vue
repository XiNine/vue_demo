<template>
  <div>
    <span class="fs-16 mr-8">时间段</span>
    <el-date-picker
      v-model="timeValue"
      class="dark-input"
      type="datetimerange"
      :picker-options="options"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd HH:mm:ss"
      align="center"
      popper-class="dark-time-picker"
      @change="datePickerChange"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  name: "Time",
  props: {
    value: {
      type: Array,
      default: () => {},
    },
    options:{
      type:Object,
      default:() => {
        return {
          shortcuts: [
            {
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              },
            },
          ],
        };
      },
    }
  },
  data() {
    return {
      timeValue:this.value,
    };
  },
  mounted() {
    let rangeInput = document.getElementsByClassName("el-range-input");
    for (let i = 0; i < rangeInput.length; i++) {
      rangeInput[i].style.backgroundColor = "#fff0";
      rangeInput[i].style.color = "#fff";
    }
  },
  methods: {
    datePickerChange(val) {
      this.$emit("valueChange", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.dark-input {
  margin-right: 30px;
}
</style>