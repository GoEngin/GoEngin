import { Component, Input, Output, EventEmitter, ElementRef, Inject } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
    selector: 'mc-header',
    moduleId: module.id,
    styleUrls: ['header.component.css'],
    templateUrl: 'header.component.html',
    host: {
        '[class.has-close]': 'hasClose'
    }
})

export class HeaderComponent extends BaseComponent {
	constructor(protected _el: ElementRef) { 
        super(_el);
    }
}