import {get,post} from './http';

const funcLogin = p => post("/cfunc/login", p); //用户登录

export {
   funcLogin
}