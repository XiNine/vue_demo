/*
axios封装请求拦截、相应拦截、错误统一处理
author：LiangShun
*/
import axios from "axios";
import router from '@/router.js';
import { token } from '@/store/index';
import { Message } from "element-ui";

/*get请求*/
function get(url, params={}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params,
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/*
post请求
参数1：接口  /  参数2：数据  / 参数3：header请求头
*/
function post(url, params={},config) {
  return new Promise((resolve, reject) => {
    axios.post(url, params,config)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/*
文件下载封装
参数1：接口  /  参数2：数据  / 参数3：文件名称
*/
async function download(url, params,name) {
  const res = await axios({
    method:"post",
    url:url,
    responseType: "blob",
    data:params
  })
  if(res.status === 200){
    const content = res.data;
    const blob = new Blob([content], { type: getSuffix(name)});
    const filesName = name;
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(content, filesName);
    }else {
      if ('download' in document.createElement('a')) {
        const elink = document.createElement('a')
        elink.download = filesName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
      } else {
        Notification.error({
          title: '错误',
          message: '网络有误！请稍后重试',
          duration: 3000
        })
      }
    }
  }
}

/*判断后缀名*/
function getSuffix(name){
  if(name.lastIndexOf(".xlsx") != -1){
    return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  }else if(name.lastIndexOf(".docx") != -1){
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  }else if(name.lastIndexOf(".doc") != -1){
    return 'application/msword';
  }else if(name.lastIndexOf(".xls") != -1){
    return 'application/vnd.ms-excel';
  }
}

/*请求超时时间*/ 
axios.defaults.timeout = 10000;

/*http request 拦截器*/
axios.interceptors.request.use(
  config => {
    config.headers = { Authorzation:token }
    return config;
  },
  error => {
   Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

/*响应拦截器*/ 
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const message = error.response.data.message;
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // localStorage.set("token","");//清除token
          router.replace({
            path: "login",
            query: { redirect: router.currentRoute.fullPath } //登录成功后跳入浏览的当前页面
          });
          localStorage
          break;
        case 403:
        Message({
          message: message,
          type: "error",
        });
        router.replace({
          path: "login",
          query: { redirect: router.currentRoute.fullPath } 
        });
          break;
        case 500: 
         Message({
            message: message,
            type: "error",
            duration: 5 * 1000
         });
         router.replace({
          path: "login",
          query: { redirect: router.currentRoute.fullPath } 
        });
          break;
      }
    }
    return Promise.reject(error.response.data);
  }
);

export {
  get,
  post,
  download
}