<template functional>
  <nav id="tabs">
     <li class="router-item">
        <router-link to="/home">首页</router-link>
     </li>
     <li class="router-item">
        <router-link to="/classify">分类</router-link>
     </li>
     <li class="router-item">
        <router-link to="/shoppingCar">购物车</router-link>
     </li>
     <li class="router-item">
        <router-link to="/mine">我的</router-link>
     </li>
  </nav>
</template>

<script>
export default {
   name:'Tabs'
}

</script>
<style lang="scss" scoped>
#tabs{
   position:fixed;
   bottom: 0;
   left: 0;
   width: 100%;
   height: 3.5rem;
   background:#BDB76B;
   border: .06rem solid #ccc;
   display: flex;
   justify-content: space-around;
   align-items: center;
   z-index: 1;
   .router-item{
      a{
         color: #696969;
         font-size: 1.2rem;
      }
      .router-link-active{
         color: #B22222;
      }
   }
}
</style>