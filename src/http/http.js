/*
axios封装请求拦截、响应拦截、错误统一处理
author：LiangShun
*/
import axios from "axios";
import { Message } from "element-ui";
import Router from "../router";
import { url } from './url';

const urls = `${url}/auth/oauth/token?grant_type=password`;

/*get请求*/
function get(url, params, config) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params }, config)
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
function post(url, params, config) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, config)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/*
  put请求
  参数1：接口  /  参数2：数据  / 参数3：header请求头
*/
function put(url, params, config) {
  return new Promise((resolve, reject) => {
    axios.put(url, params, config)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/*
  delete请求
  参数1：接口  /  参数2：数据  / 参数3：header请求头
*/
function Delete(url, params, config) {
  return new Promise((resolve, reject) => {
    axios.delete(url, params, config)
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
async function download(url, params, name="") {
  const res = await axios({
    method: "post",
    url: url,
    responseType: "blob",
    data: params
  })
  if (res.status === 200) {
    const content = res.data;
    const blob = new Blob([content], { type: getSuffix(name) });
    const filesName = name;
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(content, filesName);
    } else {
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
function getSuffix(name) {
  if (name.lastIndexOf(".xlsx") != -1) {
    return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  } else if (name.lastIndexOf(".docx") != -1) {
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  } else if (name.lastIndexOf(".doc") != -1) {
    return 'application/msword';
  } else if (name.lastIndexOf(".xls") != -1) {
    return 'application/vnd.ms-excel';
  }
  return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
}

/* 生成请求Key */
function generateReqKey(config){
  const { method,url,params,data} = config
  return [method,url,JSON.stringify(params),JSON.stringify(data)].join('&');
}

/* 当前请求信息添加到 pendingRequest 对象中 */
const pendingRequest = new Map();
function addPendingRequest(config){
  const requestKey = generateReqKey(config)
  config.cancelToken = config.cancelToken || new axios.CancelToken(cancel=>{
    if(!pendingRequest.has(requestKey)){
      pendingRequest.set(requestKey,cancel);
    }
  })
}

/* 删除重复请求 */
function removePendingRequest(config){
  const requestKey = generateReqKey(config)
  if(pendingRequest.has(requestKey)){
    const cancelToken = pendingRequest.get(requestKey)
    cancelToken(requestKey)
    pendingRequest.delete(requestKey)
  }
}

/*请求超时时间*/
axios.defaults.timeout = 10000;
/* 请求拦截器 */
axios.interceptors.request.use(
  config => {
    removePendingRequest(config) //检查是否存在重复请求，若存在则取消已发的请求
    addPendingRequest(config) // 把当前请求信息添加到pendingRequest对象中
    const url1 = config.url.substr(0, 63);
    if (url1 !== urls) {
      config.headers = { "Authorization": "bearer " + localStorage.getItem('token') };
    }
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
    removePendingRequest(response.config) // 从pendingRequest对象中移除请求
    return response;
  },
  error => {
    removePendingRequest(error.config || {}) // 从pendingRequest对象中移除请求
    const { message } = error.response.data;
    if (error.response) {
      Message({
        message: message,
        type: "error",
        duration: 5 * 1000
      });
    }
    if (error.response.status == 401) {
      Message({
        message: "登录过期，请重新登录",
        type: "error",
        duration: 5 * 1000
      });
      Router.replace({path: '/login'});
      localStorage.clear();
    }
    return Promise.reject(error.response.data);
  }
);

export {
  get,
  post,
  put,
  Delete,
  download
}