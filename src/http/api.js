import {get,post,put,Delete,download} from './http';
import { url } from "./url"

const getLogin = (data,config) => post(`${url}/auth/oauth/token?grant_type=password&username=${data.userName}&password=${data.password}`,{},config);
const getRoleAction = data => get(url+'/auth/user',data);//获取权限标识

export {
   getLogin
}