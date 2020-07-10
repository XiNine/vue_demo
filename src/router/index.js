import Vue from 'vue'
import VueRouter from 'vue-router'
import state from '@/store/index'
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

const Router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


/*????*/
Router.beforeEach((to,from,next)=>{
  const token = state.state.token;
  if(to.meta.requireAuth){
    token ? next() : next({name:"home"});
  }else{
    next();
  }
})

export default Router;
