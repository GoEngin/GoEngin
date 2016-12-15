import { Component, Input, Output, EventEmitter, ElementRef, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../base.component';
import { SharedService } from '../../shared.service';

const Direction = {
    Left: 'left',
    Right: 'right',
    Top: 'top',
    Bottom: 'bottom'
};

@Component({
    selector: 'mc-drawer',
    moduleId: module.id,
    styleUrls: ['drawer.component.css'],
    templateUrl: 'drawer.component.html',
    host: {
        '[style.z-index]': '_zIndex',
        '[class.shown]': '_shown',
        '[class.opened]': '_opened',
        '[class.is-bottom]': 'direction === "bottom"',
        '[class.is-top]': 'direction === "top"',
        '[class.is-left]': 'direction === "left"',
        '[class.is-right]': 'direction === "right"'
    }
})

export class DrawerComponent extends BaseComponent {

    private _zIndex: number = 99;
    private _shown: boolean = false;
    private _opened: boolean = false;
    private _contentCmp: any;

    @ViewChild('children', {read: ViewContainerRef}) container: ViewContainerRef;

    @Input() direction: string = Direction.Bottom;
    @Input() cls: string;
    @Input() message: string;
    @Input() hasClose: boolean = false;
    @Input()
    set config(config: any) {
        if (config.zIndex) {
            this._zIndex = config.zIndex;
        }
        if (config.direction) {
            this.direction = config.direction;
        }
        if (config.message) {
            this.addBaseCls('drawer__message');
            this.message = config.message;
        }
        if (config.cls) {
            this.cls = config.cls;
        }
        if (config.contentInfo) {
            this.addContent(config.contentInfo);
        }
        if (config.hasClose) {
            this.hasClose = true;
        }
    }

    @Output() hided: EventEmitter<any> = new EventEmitter();

    constructor(protected _el: ElementRef, private _service: SharedService) { 
        super(_el);
    }

    addContent(config: any) {
        if (this._contentCmp) {
            this._contentCmp.destroy();
        }

        let cmp: any = this._service.addComponent(config.cmpType, config.config, this.container);
        if (cmp.instance.hide) {
            cmp.instance.hide.subscribe((e: any) => this.hide());
        }
        this._contentCmp = cmp;
    }

    show(msg?: string, cls?: string) {
        //for animation, we need time to apply a new class

        //message
        this._shown = true;
        if (msg && !this.cls) {
            this.addBaseCls('drawer__message');
            this.message = msg;
        }
        if (cls) {
            this.cls = cls;
        }
        //end message

        setTimeout(() => {
            this._opened = true;
        }, 100)
    }

    hide() {
        this._opened = false;
        setTimeout(() => {
            this._shown = false;
            this.hided.emit({target:this});
        }, 300)
    }

    opened() {
        return this._opened;
    }

    onPressMask(e: any) {
        this.hide();
    }

    onClose(e: any) {
        this.hide();
    }
}