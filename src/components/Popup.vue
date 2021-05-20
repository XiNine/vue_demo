<!-- 弹窗   -->
<template>
  <div class="Popup">
    <div class="wrap">
      <!-- 透明效果 -->
      <div class="wrap-box" v-if="bg"></div>

      <div :class="['yinying','border-color',texture || 'texture']">
        <div class="header flex" v-if="header">
          <div>
            <div class="icon yujing" v-if="icon == 1"></div>
            <div class="icon jindu" v-if="icon == 2"></div>
            <slot name="header" />
          </div>
        </div>
        <!-- 关闭按钮 -->
        <i class="el-icon-close fs-18" @click="closeAction" v-if="close"></i>

        <div class="lines" v-if="header"></div>
        <div class="leftTop"></div>
        <div class="leftBottom"></div>
        <div class="rightTop"></div>
        <div class="rightBottom"></div>

        <div class="content">
          <slot name="content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Popup",
  props: {
    icon: {
      type: [Number, String],
      default: null
    },
    close:{
      type:Boolean,
      default:true
    },
    header:{
      type:Boolean,
      default:true
    },
    bg:{
      type:Boolean,
      default:true
    },
    texture:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    //点击关闭
    closeAction() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped lang="scss">
.Popup {
  position: absolute;
  z-index: 9999;
  .wrap {
    width: 100%;
    height: 100%;
    position: relative;
    .wrap-box {
      pointer-events: none;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(4,11,38,.8);
    }
    .texture{
      box-shadow: 0px 0px 15px 4px #09bcc3 inset;
      background-image: url("../assets/images/home/bg-box.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .yinying {
      width: 100%;
      height: 100%;
      position: relative;
      color: #fff;
      .content {
        padding: 0 10px 10px;
        min-width: 400px;
        min-height: 260px;
      }
      .el-icon-close {
        position: absolute;
        top: 20px;
        right: 10px;
        color: #01f5fd;
        z-index: 10;
        cursor: pointer;
      }
      .header {
        text-align: center;
        padding-top: 10px;
        div {
          text-align: center;
          font-size: 16px;
          font-weight: 1000;
          margin: 0 auto;
          color: #01f5fd;
          display: flex;
          align-items: center;
          .icon {
            width: 18px;
            height: 18px;
            display: inline-block;
            background-size: 100% 100%;
            margin: 0 5px;
          }
          .yujing {
            background: url("../assets/images/common/alert.svg") no-repeat;
          }
          .jindu {
            background: url("../assets/images/common/speed.svg") no-repeat;
          }
        }
      }
      .common {
        background-size: 100% 100%;
        width: 100px;
        height: 64px;
        position: absolute;
        pointer-events: none;
      }
      .leftTop {
        background: url("../assets/images/common/Top left.svg") no-repeat;
        top: 0px;
        left: 0px;
        @extend .common;
      }
      .leftBottom {
        background: url("../assets/images/common/Lower left.svg") no-repeat;
        bottom: -2px;
        left: -1px;
        @extend .common;
      }
      .rightTop {
        background: url("../assets/images/common/Top right.svg") no-repeat;
        top: -2px;
        right: 0;
        @extend .common;
      }
      .rightBottom {
        background: url("../assets/images/common/Lower right.svg") no-repeat;
        bottom: -2px;
        right: 0;
        @extend .common;
      }
      .lines {
        background: url("../assets/images/common/line.svg") no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 25px;
        z-index: 10;
      }
    }
  }
}
</style>