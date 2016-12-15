import { Component, Input, Output, Inject, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
    moduleId: module.id,
    selector: 'mc-carouselitem',
    styleUrls: ['carouselitem.component.css'],
    templateUrl: 'carouselitem.component.html',
    host: {
        '[attr.data-idx]': 'idx',
        '[style.width]' : '_width'
    }
})

export class CarouselItemComponent extends BaseComponent {

    private _width: string;

    @ViewChild('children', {read: ViewContainerRef}) container: ViewContainerRef;
    
    @Input() idx: number = 0;
    @Input() 
    set width(value: number) {
        this._width = value + 'px';
    }
    get width() {
        return parseInt(this._width.split('px')[0]);
    }
    @Input()
    set config(config: any) {
        if (config.idx) {
            this.idx = config.idx;
        }
        if (config.width) {
            this.width = config.width;
        }
    }

    constructor(protected _el: ElementRef) { 
        super(_el);
    }
}