import { EventEmitter, Output } from '@angular/core';
import { Injectable } from '@angular/core';
import { Util } from '../shared/util/util';
import { md5 } from '../shared/util/md5';

const CONS = {
	path: {
		users: 'users'
	}
};

@Injectable()
export class LoginService {

	private _da: any;
	private _util: Util;

	@Output() loggedin: EventEmitter<any> = new EventEmitter();
	@Output() sendmsg: EventEmitter<any> = new EventEmitter();
	@Output() createduser: EventEmitter<any> = new EventEmitter();
	@Output() resetpassword: EventEmitter<any> = new EventEmitter();

	constructor() {
		this._util = new Util();
		this._da = this._util.dataAccess();
	}

	private _setUserInfo(uid: string, userInfo: any, remember: boolean) {
		//remebmer === local storage
		//save to the storage
		this._util.setItem('uid',uid,remember);
		this._util.setItem(uid,userInfo,remember);
	}

	private _getUserInfo(uid: string = this.getUserId()) {
		let userInfo: any = null;
		if (uid) {
			userInfo = this._util.getItem(uid) || this._util.getItem(uid,false);
		}
		return userInfo
	}

	private _removeUserInfo(reload: boolean = false) {
		let uid = this.getUserId();
		if (uid) {
			this._util.removeItem('uid');
			this._util.removeItem(uid);
		}
		if (reload) {
			location.reload(true);
		}
	}

	login( provider: string = 'email', email: string = '', password: string = '', remember: boolean = false ) {
		this._removeUserInfo();
		this._da.login(provider, email, password)
			.then((result: any) => this.didLogin(provider, result, remember))
			.catch((error: any) => this.doSendMsg(error));
		return
	}

	didLogin(provider: string, result: any, remember: boolean) {
		//token = result.credential.accessToken;
		//user: displayName, email, emailVerified, isAnonymous, photoURL, providerData, providerId, refreshToken, uid
		//value event is fired eery time data is changed.
		let user = result.user || result;
		this._da.getDataOnce(CONS.path.users + '/' + user.uid).then((snapshot: any) => {
			let userInfo: any = snapshot.val();
			if (!userInfo || provider !== 'email') {
				userInfo = this.createSNSUser(user);
			}
			if (!this.getUserId()) {
				this._setUserInfo(userInfo.uid, userInfo, remember);
			}
			this.loggedin.emit({target:this,userInfo:userInfo});
		}).catch((error: any) => this.doSendMsg(error));
	}

	loginFacebook() {
		this.login('facebook');
	}

	loginGoogle() {
		this.login('google');
	}

	logout() {
		this._da.logout().then((result: any) => {
			//remove saved user data
			this._removeUserInfo(true);
		}).catch((error: any) => this.doSendMsg(error));
	}

	getUserId() {
		return this._util.getUserId();
	}

	updateUserInfo(userInfo: any) {
		this._da.setData(CONS.path.users + '/' + userInfo.uid, userInfo);
	}

	createSNSUser(user: any) {
		let userInfo = {
			uid: user.uid,
			username: user.displayName,
			email: user.email,
			photoURL: user.photoURL
		}
		this.updateUserInfo(userInfo);
		return userInfo;
	}

	createUser(displayName: string, email: string, password: string) {
		this._da.createUser(email,password).then((result: any) => {
			//token = result.credential.accessToken;
			let userInfo = {
				uid: result.uid,
				username: result.displayName || displayName,
				email: result.email,
				photoURL: result.photoURL || 'http://www.gravatar.com/avatar/' + md5(result.email)
			}
			this.updateUserInfo(userInfo);
			this.createduser.emit({target:this,userInfo:userInfo});
		}).catch((error: any) => this.doSendMsg(error));
	}

	sendPasswordResetEmail(email: string) {
		this._da.sendPasswordResetEmail(email).catch((error: any) => this.doSendMsg(error));
		this.resetpassword.emit({target:this});
	}

	doSendMsg(msg: any, config: any = null) {
		this.sendmsg.emit({target:this,msg:msg.message,config:config});
	}
}
