import Vue from 'vue'
import VueRouter from 'vue-router'
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

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
