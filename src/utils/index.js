/*全局共公组件及方法*/
import myHeader from '@/components/Header.vue'
// import { Icon } from 'vant';
// import 'vant/lib/index.css';

const subArr = [myHeader]

export default {
   install(Vue) {
      //Vue.component(myHeader.name,myHeader);
      subArr.forEach(item=>Vue.component(item.name,item))

      /*时间格式处理---参数1：时间、参数2：是否要时分秒 */
      Vue.prototype.$getTime = function (time, status = true) {
         const year = time.getFullYear();
         const month = (time.getMonth() + 1).toString().padStart(2, '0');
         const day = time.getDate().toString().padStart(2, '0');
         const hours = time.getHours().toString().padStart(2, '0');
         const minute = time.getMinutes().toString().padStart(2, '0');
         const second = time.getSeconds().toString().padStart(2, '0');
         if (status) return `${year}-${month}-${day} ${hours}:${minute}:${second}`;
         return `${year}-${month}-${day}`;
      };
      Vue.prototype.$tips = function(name){
         this.$notify({
            title: "成功",
            message: `${name}！`,
            type: "success",
            customClass: "tongzhi",
          });
      },
      Vue.prototype.$random = function(num) {
         return Math.floor(Math.random()*num)
      },
      /* 窗口拖动 */
      Vue.directive("freedrag", {
         inserted(el) {
            el.onmousedown = (e1) => {
               el.style.cursor = 'move';
               let domX = e1.clientX - el.offsetLeft;
               let domY = e1.clientY - el.offsetTop;
               let left = '', top = '';
               document.onmousemove = (e2) => {
                  left = e2.clientX - domX;
                  top = e2.clientY - domY;
                  el.style.left = left + 'px';
                  el.style.top = top + 'px';
               }
               document.onmouseup = (e3) => {
                  el.style.cursor = 'default';
                  document.onmousemove = null;
                  document.onmouseup = null;
               }
            }
         }
      })
   }
}