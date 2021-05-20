  <!-- 分页 -->
<template>
  <div class="bottom-wrap bottom flex">
    <div class="fs-16">共<span class="header-color">{{total}}</span>条</div>
    <el-pagination
      @current-change="setCurrentAction"
      @size-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name:"paging",
  props: {
    total: {//总条数
       type:[Number,String],
       default:10
    } 
  },
  mounted() {
    let rangeInput = document.getElementsByClassName("el-input__inner");
    for (let i = 0; i < rangeInput.length; i++) {
      rangeInput[i].style.backgroundColor = "#fff0";
      rangeInput[i].style.color = "#fff";
    }
  },
  methods: {
    //当前页
    setCurrentAction(e) {
      this.$emit("setPage", e);
    },
    //条数
    handleCurrentChange(e) {
      this.$emit("setNum", e);
    }
  }
};
</script>

<style scoped lang="scss">
.bottom-wrap{
    div{
      span{
        margin: 0 6px;
      }
    }
  ::v-deep.btn-next{
     background-color: transparent !important;
  }
  ::v-deep.el-pager li{
     background-color: transparent !important;
     color: #f1f1f1;
  }
  ::v-deep.el-pagination__total{
     color: #fff;
  }
  ::v-deep.el-pagination__jump{
     color: #fff;
  }
  ::v-deep.el-pagination button:disabled{
     background-color: transparent !important;
  }
  ::v-deep.el-pager .number{
     color: #f1f1f1;
  }
  ::v-deep.el-pager .active{
     color: #01F5FD;
  }
  ::v-deep.el-pagination__editor.el-input .el-input__inner{
     color: #f1f1f1;
  }
}
</style>