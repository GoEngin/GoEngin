import { Component, ViewContainerRef } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { UserMenuComponent } from '../usermenu/usermenu.component';
import { DrawerComponent } from '../shared/component/index';
import { SharedService } from '../shared/shared.service'; 

@Component({
	moduleId: module.id,
	selector: 'mc-appheader',
	styleUrls: ['appheader.component.css'],
	templateUrl: 'appheader.component.html',
	host: {
		'(click)':'onPress($event)'
	}
})
export class AppHeaderComponent {

	private _util: any;
	private _photoURL: string;
	private _isLoggedIn: boolean;
	private _userInfo: any;

	constructor(
		private _el: ViewContainerRef,
		private _service: SharedService
	) {
		this._util = this._service.util();
		this.checkLoggedIn();
	}

	checkLoggedIn() {
		this._isLoggedIn = this._util.isLoggedIn();
		if (this._isLoggedIn) {
			this._userInfo = this._util.getUserInfo();
			this._photoURL = this._userInfo.photoURL;
		}
		return this._isLoggedIn;
	}

	onPress(e: any) {
		let dom = this._util.dom();
		if (dom.findParent(e.target,'.button__header__person')) {
			this.showLoginForm();
		} else if (dom.findParent(e.target,'.button__header__gravatar')) {
			this.showUserMenu();
		}
	}

	showLoginForm() {
		let config = {
			cls: 'drawer__usermenu',
			direction: 'right',
			hasClose: true,
			contentInfo: {
				cmpType: LoginComponent
			}
		};
		let cmp = this._service.showDrawer(DrawerComponent, this._el, config);
		cmp.instance.hided.subscribe((e: any) => {
	      cmp.destroy();
	      this.checkLoggedIn();
	    });
	}

	showUserMenu() {
		let config = {
			cls: 'drawer__login',
			direction: 'right',
			hasClose: true,
			contentInfo: {
				cmpType: UserMenuComponent
			}
		};
		let cmp = this._service.showDrawer(DrawerComponent, this._el, config);
		cmp.instance.hided.subscribe((e: any) => {
	      cmp.destroy();
	    });
	}
}
