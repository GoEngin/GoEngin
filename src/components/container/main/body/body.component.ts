import {Component, HostListener, Output, EventEmitter} from 'angular2/core';

//If the component doesn't have moduleId, 404 error.
@Component({
    selector: 'ge-body',
    moduleId: module.id,
    styleUrls: ['./body.component.css'],
    templateUrl: './body.component.html'
})

export class BodyComponent {
	//Declare public member first.
	@Output() hideHeader: EventEmitter<any> = new EventEmitter();
	//Declare private member
	private _headerHeight = 241-56;
	private _isHideHeader = false;
	@HostListener('window:scroll', ['$event']) onScroll(e) {
		if (e.target.body.scrollTop > this._headerHeight) {
			if (!this._isHideHeader) {
				this._isHideHeader = true;
				this.hideHeader.emit({ isHide: this._isHideHeader });
			}
		} else {
			if (this._isHideHeader) {
				this._isHideHeader = false;
				this.hideHeader.emit({ isHide: this._isHideHeader });
			}
		}
	}
}
