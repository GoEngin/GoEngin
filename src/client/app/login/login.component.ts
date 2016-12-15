import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormComponent, ButtonComponent, InputComponent } from '../shared/component/index';
import { LoginService } from './login.service';
import { SharedService } from '../shared/shared.service'; 

const CONS: any = {
	validator: {
		userName: {
			required: {
				errorMessage: 'The username is required!'
			}
		},
		email: {
			required: {
				errorMessage: 'The email is required!'
			},
			email: {
				errorMessage: 'It is not email address!'
			}
		},
		password: {
			required: {
				errorMessage: 'The password is required!'
			}
		},
		confirmPassword: {
			required: {
				errorMessage: 'The confirm password is required!'
			},
			equal: {
				field: 'password',
				errorMessage: 'The password and confirm password are not matched!'
			}
		}
	},
	mode: {
		login: {
			type: 'login',
			title: 'Log in to InQnA'
		},
		signup: {
			type: 'signup',
			title: 'Sign up InQna'
		},
		passwordReset: {
			type: 'passwordReset',
			title: 'Send Password Reset Email'
		},
	}
}

@Component({
	selector: 'mc-login',
	moduleId: module.id,
	styleUrls: ['login.component.css'],
	templateUrl: 'login.component.html',
	host: {
		'(click)':'onPress($event)',
		'[class.mode__signup]':'mode === "signup"'
	}
})

export class LoginComponent {

	mode: string = CONS.mode.login; // login, signup
	validator: any;

	@ViewChild('frmLogin') frm: FormComponent;

	@Output() hide: EventEmitter<any> = new EventEmitter();

	constructor(
		private _loginService: LoginService,
		private _service: SharedService
	) {
		this.validator = CONS.validator;
		this._loginService.loggedin.subscribe((e: any) => this.close());
		this._loginService.sendmsg.subscribe((e: any) => this._service.doSendMsg(e.msg));
		this._loginService.createduser.subscribe((e: any) => this.onCreatedUser(e));
		this._loginService.resetpassword.subscribe((e: any) => this.onResetPassword(e));
	}

	onPress(e: any) {
		let dom = this._service.dom();
		if (dom.findParent(e.target,'.button__login__login')) {
			this.onPressLogin();
		}
		else if (dom.findParent(e.target,'.button__login__facebook')) {
			this.onPressLoginFacebook();
		}
		else if (dom.findParent(e.target,'.button__login__google')) {
			this.onPressLoginGoogle();
		}
		else if (dom.findParent(e.target,'.button__login__forgot-password')) {
			this.onPressForgotPassword();
		}
		else if (dom.findParent(e.target,'.button__login__sign-up-now')) {
			this.onPressSignUpNow();
		}
		else if (dom.findParent(e.target,'.button__login__sign-up')) {
			this.onPressSignUp();
		}
		else if (dom.findParent(e.target,'.button__login__go-login')) {
			this.onPressGoLogin();
		}
		else if (dom.findParent(e.target,'.button__login__password-reset')) {
			this.onPressPasswordReset();
		}
	}

	onPressLogin() {
		if (this.frm.validate()) {
			let values = this.frm.getValues();
			this._loginService.login('email',values.email,values.password,values.rememberMe);
		}
	}

	onPressLoginFacebook() {
		this._loginService.loginFacebook();
	}

	onPressLoginGoogle() {
		this._loginService.loginGoogle();
	}

	onPressForgotPassword() {
		this.changeMode(CONS.mode.passwordReset);
	}

	onPressSignUpNow() {
		this.changeMode(CONS.mode.signup);
	}

	onPressGoLogin() {
		this.changeMode(CONS.mode.login);
	}

	onPressPasswordReset() {
		if (this.frm.validate()) {
			let values = this.frm.getValues();
			this._loginService.sendPasswordResetEmail(values.email);
		}
	}

	onResetPassword(e: any) {
		this.changeMode(CONS.mode.login);
	}

	changeMode(mode: any) {
		this.mode = mode;
	}

	onPressSignUp() {
		if (this.frm.validate()) {
			let values = this.frm.getValues();
			this._loginService.createUser(values.userName, values.email, values.password);
		}
	}

	onCreatedUser(e: any) {
		this.changeMode('login');
	}

	onValueChange(value: any) {}

	close() {
		this.hide.emit({target:this});
	}
}
