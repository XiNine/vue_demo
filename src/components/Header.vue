<template>
  <header id="header">
    <van-icon name="arrow-left" color="white" size="1.4rem" v-if="show"/>
    <span class="center color-primary"><slot name="center"/></span>
    <span class="right"><slot name="right"/></span>
  </header>
</template>

<script>
export default {
  name:'myHeader',
  props:{
    show:{
      type:Boolean,
      default:true
    }
  }
}

</script>

<style lang="scss" scoped>
#header{
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 2.5rem;
   line-height: 2.5rem;
   background:#B8860B;
   color: white;
   .van-icon-arrow-left{
     line-height: 2.5rem;
     padding: 0 .5rem;
   }
    .center{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .right{
      position: absolute;
      right: 1rem;
    }
}
</style>