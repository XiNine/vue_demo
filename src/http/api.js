import {get,post} from './http';

const getLogin = data => post("/cfunc/login", data); //??

export {
   getLogin
}