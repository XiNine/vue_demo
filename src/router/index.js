import Vue from 'vue'
import VueRouter from 'vue-router'
import state from '../store/index'
import routerHome from './home'
import routerClassify from './classify'
import routerShoppingCar from './shoppingCar'
import routerMine from './mine'

Vue.use(VueRouter)

const routes = [
  routerHome,
  routerClassify,
  routerShoppingCar,
  routerMine,
  {
    path:'**',
    redirect:'/home'
  }
]

//路由拦截
routes.beforeEach((to,from,next)=>{
  const token = state.home.state.token;
  if(to.mete.requireAuth){
    if(token){
      next();
    }else{
      next({
        path:'/login',
        query:{redirect:to.fullPath}
      })
    }
  }else{
    next();
  }
})

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
