<template>
  <div class="select">
    <span class="fs-16 mr-8" v-if="title">
      <slot />
    </span>
    <el-select placeholder="请选择" class="selectT" @change="changeValue" :value="value">
      <el-option
        v-for="item in selectArr"
        :key="item.value"
        :label="item.value"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "selectName",
  props: {
    selectArr: {
      type: Array,
      default: () => {},
    },
    title:{
      type:Boolean,
      default:true
    },
    value: String,
  },
  methods: {
    changeValue(val) {
      this.$emit("dropDown", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  display: flex;
  align-items: center;
  margin-right: 30px;
  .selectT {
    width: 110px;
  }
  ::v-deep.el-input--suffix .el-input__inner {
    height: 28px;
    line-height: 28px;
  }
  ::v-deep.el-input__icon {
    line-height: 100%;
  }
}
</style>