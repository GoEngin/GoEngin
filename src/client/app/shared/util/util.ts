import { Dom } from './dom';
import { DataAccess } from './dataaccess';
import { Validator } from './validator';

export class Util {

  _dom: Dom;
  _da: any;

  constructor() { 
    this._dom = new Dom();
    this._da = new DataAccess();
  }

  isEmpty(value:any) {
    if (value === undefined || value === null || value === '') {
      return true;
    }
    return false;
  }

  validator() {
    return Validator;
  }

  //data access
  dataAccess() {
    return this._da;
  }

  //dom
  dom() {
    return this._dom;
  }

  // Web Storage 
  setItem(key: string, value: any, isLocal: boolean = true) {
    let store = this._getStore(isLocal);
    store.setItem('__mc__' + key, JSON.stringify(value));
  }

  getItem(key: string, isLocal: boolean = true) {
    let store = this._getStore(isLocal);
    let value = store.getItem('__mc__' + key);
    return value ? JSON.parse(value) : null;
  }

  removeItem(key: string) {
    this.setItem(key,null,false);
    this.setItem(key,null);
  }

  private _getStore(isLocal: boolean) {
    return !isLocal ? localStorage : sessionStorage;
  }

  // Global Data 
  getUserId() {
    return this.getItem('uid') || this.getItem('uid',false);
  }

  getUserInfo() {
    let uid = this.getUserId();
    let userInfo: any;
    if (uid) {
      return this.getItem(uid) || this.getItem(uid,false);
    }
    return false;
  }

  isLoggedIn() {
    return this.getUserId() ? true : false;
  }
}