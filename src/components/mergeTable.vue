<!-- 公共表格 -->
<template>
  <el-table :data="tableData" :span-method="spanMethod">
    <template v-for="config in tableConfig">
      <slot v-if="config.slot" :name="config.slot"></slot>
      <el-table-column v-bind="config" :resizable="false" :key="config.prop" height="5"></el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  name: "mergeTable",
  props: {
    mergeKeys: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      required: true,
      default: () => [],
    },
    tableConfig: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      mergeData: {},
      mergePos: {},
    };
  },
  mounted() {
    this.getSpanArr(this.tableData, this.mergeKeys);
  },
  methods: {
    getSpanArr(tableData, keyName) {
      let mergeData = this.mergeData;
      let mergePos = this.mergePos;
      keyName.forEach((kitem) => {
        tableData.forEach((data, i) => {
          if (i === 0) {
            mergeData[kitem] = mergeData[kitem] || [];
            mergeData[kitem].push(1);
            mergePos[kitem] = 0;
          } else {
            if (data[kitem] === tableData[i - 1][kitem]) {
              mergeData[kitem][mergePos[kitem]] += 1;
              mergeData[kitem].push(0);
            } else {
              mergeData[kitem].push(1);
              mergePos[kitem] = i;
            }
          }
        });
      });
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.mergeKeys.includes(column.property)) {
        const _row = this.mergeData[column.property][rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
  },
};
</script>

<style lang="stylus"></style>
