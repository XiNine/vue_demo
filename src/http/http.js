import axios from 'axios';
import store from '../store/index';
import router from '../router/index';

function get(url,params = {}){
   return Promise((resolve,reject)=>{
      axios.get(url,{
         params:params
      })
      .then(res=>{
         resolve(res.data);
      })
      .catch(err=>{
         reject(err.data);
      })
   })
}

function post(url,params = {}){
   return Promise((resolve,reject)=>{
      axios.post(url,params)
      .then(res=>{
         resolve(res.data);
      })
      .catch(err=>{
         reject(err.data);
      })
   })
}

// 请求超时时间
axios.defaults.timeout = 10000;

//http request 拦截器
axios.interceptors.request.use(
  config => {
    const token = store.home.state.token;
    config.headers = {
      "Content-Type": "application/json; charset=UTF-8",
      "Cache-Control": "max-age=604800",
      Authorzation: token
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401: //未授权，需要用户身份验证
          store.commit("CLEAR_TOKEN");// 这里写清除token的代码
          router.replace({
            path: "login",
            query: { redirect: router.currentRoute.fullPath } 
          });
          break;
        case 403: //拒绝访问
          store.commit("CLEAR_TOKEN");
          router.replace({
            path: "login",
            query: { redirect: router.currentRoute.fullPath }
          });
          break;
        case 500: 
          break;
      }
    }
    return Promise.reject(error.response.data);
  }
);

export default {
   get,
   post
}