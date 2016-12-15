import { Component, Input, Output, EventEmitter, ElementRef, Inject, ViewChild } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
    selector: 'mc-listitem',
    moduleId: module.id,
    styleUrls: ['listitem.component.css'],
    templateUrl: 'listitem.component.html',
    host: {
        '[attr.data-id]': 'item[idField]',
        '[class.listitem__tile]': 'isTile'
    }
})

export class ListItemComponent extends BaseComponent {

    @Input() cls: string;
    @Input() item: any;
    @Input() columns: any[];
    @Input() idField: string = 'id';
    @Input() hasDetail: boolean;
    @Input() hasTable: boolean;
    @Input() isTile: boolean = false;

    constructor(protected _el: ElementRef) { 
        super(_el);
    }

}