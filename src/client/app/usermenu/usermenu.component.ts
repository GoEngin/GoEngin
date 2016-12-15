import { Component, ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Util } from '../shared/util/util'; 

@Component({
	moduleId: module.id,
	selector: 'mc-usermenu',
	styleUrls: ['usermenu.component.css'],
	templateUrl: 'usermenu.component.html',
	host: {
		'(click)':'onPress($event)'
	}
})
export class UserMenuComponent {

	private _util: Util;

	@Output() hide: EventEmitter<any> = new EventEmitter();

	constructor(
		private _el: ViewContainerRef, 
		private _loginService: LoginService,
	) {
		this._util = new Util();
	}

	onPress(e: any) {
		let dom = this._util.dom();
		if (dom.findParent(e.target,'.button__login__logout')) {
			this._loginService.logout();
			this.hide.emit({target:this});
		}
	}
}
