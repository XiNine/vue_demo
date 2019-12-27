import myHeader from '../components/Header.vue'
import { Icon } from 'vant';
import 'vant/lib/index.css';

export default {
   install(Vue){
      Vue.component(myHeader.name,myHeader);
      Vue.component(Icon.name,Icon);
   }
}