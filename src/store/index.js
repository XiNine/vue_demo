import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import classify from './modules/classify'
import shoppingCar from './modules/shoppingCar'
import mine from './modules/mine'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    home,
    classify,
    shoppingCar,
    mine
  }
})
