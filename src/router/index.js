import Vue from 'vue'
import VueRouter from 'vue-router'
import state from '@/store/index'
import routerHome from './home'
import routerClassify from './classify'
import routerShoppingCar from './shoppingCar'
import routerMine from './mine'

const staticList = ["/login", "/register"];

Vue.use(VueRouter)

const routes = [
  home,
  dataAnalysis,
  enterprise,
  enterpriseIndex,
  login,
  register,
  historicalData,
  EventAdmin,
  info,
  ...common,
  {
    path: "**",
    redirect: roleRedirect()
  }
]

function roleRedirect(){
  switch(localStorage.getItem('role')){
    case "2":
      return "/home";
    case "3":
      return "/enterpriseIndex";
    default:
      return '/Admin';
  }
}

const Router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

/*路由拦截*/
Router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  if (token) {
    if (to.path === '/login') {
      next();
    } else {
      to.meta.roles.includes(role) ? next() : next(false);
    }
  } else {
    staticList.includes(to.path) ? next() : next({
      path: "/login"
    });
  }
})

export default Router;
