import { Component, Input, ElementRef, Inject } from '@angular/core';
import { BaseComponent } from '../base.component'

@Component({
    selector: 'mc-icon',
    moduleId: module.id,
    styleUrls: ['icon.component.css'],
    template: ''
})

export class IconComponent extends BaseComponent {

	private _icon: string;
	
	@Input()
	get icon() {
		return this._icon;
	}
	set icon(value: string) {
		this._icon = value;
		this.cls = 'icon-' + value;
	}

    constructor( protected _el: ElementRef) {
        super(_el);
    }
}
