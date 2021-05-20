import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils/index'

import 'amfe-flexible';

Vue.prototype.$echarts = echarts;
Vue.use(utils);
Vue.use(Element);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
