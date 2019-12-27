<template>
  <div id="home">
     <myHeader :show="false">
        <template #center>center</template>
        <template #right>right</template>
     </myHeader>
     首页
   </div>
</template>

<script>
export default {
   data(){
      return {}
   },
}

</script>
<style lang="scss" scoped>
#home{
   position: fixed;
   top: 2.5rem;
   width: 100%;
   height: 100%;
   background: pink;
}
</style>