import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import classify from './modules/classify'
import shoppingCar from './modules/shoppingCar'
import mine from './modules/mine'
import persistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [persistedState({storage: window.localStorage})],
  state:{
    token:"100"
  },
  modules:{
    home,
    classify,
    shoppingCar,
    mine
  }
})
