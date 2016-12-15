//Base Component - Deprecated
//example Component Inheritance: http://wijmo.com/blog/using-class-inheritance-to-create-a-custom-component-in-angular-2/
//ElementRef and Renderer are injected from a child, so that they aren't needed, but the typescript lint doesn't konw that so I added them for the lint.
import { Input, ElementRef } from '@angular/core';
import { Util } from '../util/util';

export class BaseComponent {

    private _cls: string;
    public el: HTMLElement;
    public util: Util;

    constructor(protected _el: ElementRef) { 
        this.el = this._el.nativeElement;
        this.util = new Util();
    }

    @Input()
    set cls(value: string) {
        if (this._cls) {
            this.util.dom().removeCls(this.el,value);
        }
        this.util.dom().addCls(this.el,value);
        this._cls = value;
    }
    get cls() {
        return this._cls;
    }

    // add base cls, this is not removable.
    addBaseCls(cls: string) {
        this.util.dom().addCls(this.el,cls);
    }
}