/*全局共公组件及方法*/
import myHeader from '@/components/Header.vue'
// import { Icon } from 'vant';
// import 'vant/lib/index.css';

export default {
   install(Vue) {
      Vue.component(myHeader.name,myHeader);
      // Vue.component(Icon.name,Icon);

      //时间格式处理
      Vue.prototype.$getLocalTime = function(status = true) { //true不要时分秒
         const time = new Date();
         const year = time.getFullYear();
         const month = (time.getMonth() + 1).toString().padStart(2, '0');
         const day = time.getDate().toString().padStart(2, '0');
         const hours = time.getHours().toString().padStart(2, '0');
         const minute = time.getMinutes().toString().padStart(2, '0');
         const second = time.getSeconds().toString().padStart(2, '0');
         if (status) return `${year}/${month}/${day}`;
         return `${year}-${month}-${day}-${hours}:${minute}:${second}`;
      }
   }
}