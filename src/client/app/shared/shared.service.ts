import { Injectable, ViewContainerRef, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';
import { Util } from './util/util';

@Injectable()
export class SharedService {

  _util: Util;

  @Output() sendmsg: EventEmitter<any> = new EventEmitter();

  constructor(private _resolver: ComponentFactoryResolver) { 
    this._util = new Util();
  }

  doSendMsg(msg: string, config: any = null) {
    this.sendmsg.emit({target:this, msg:msg, config:config});
  }

  showMsg(drawer: any, parentEl: ViewContainerRef, msg: string, direction: string = 'top', cls: string = 'red') {
    let config = {message: msg, direction: direction, cls: cls, zIndex: 1001};
    let cmp: any = this.showDrawer(drawer, parentEl, config);
    cmp.instance.hided.subscribe((e: any) => {
      cmp.destroy();
    });
    return cmp;
  }

  showDrawer(drawer: any, parentEl: ViewContainerRef, config: any, show: boolean = true) {
    let cmp: any = this.addComponent(drawer, config, parentEl);
    if (show) cmp.instance.show();
    return cmp;
  }

  addComponent(cmpType: any, config: any = {}, parentEl: ViewContainerRef, idx: number = 0) {
    //http://stackoverflow.com/questions/39297219/angular2-rc6-dynamically-load-component-from-module
    let factory = this._resolver.resolveComponentFactory(cmpType);
    let cmp: any = parentEl.createComponent(factory);
    cmp.instance['config'] = config;
    return cmp;
  }

  util() {
    return this._util;
  }

  isLoggedIn() {
    return this._util.isLoggedIn();
  }

  getUserId() {
    return this._util.getUserId();
  }

  validator() {
    return this._util.validator();
  }

  //data access
  dataAccess() {
    return this._util.dataAccess();
  }

  //dom
  dom() {
    return this._util.dom();
  }
}