import { Component, Input, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ListData } from '../../model/listdata';
import { BaseComponent } from '../../base.component';

@Component({
    selector: 'mc-toggle',
    moduleId: module.id,
    styleUrls: ['./toggle.component.css'],
    templateUrl: './toggle.component.html',
    host: {
        '(click)':'onPress($event)',
        '(focus)':'onFocus($event)',
        '(blur)': 'onBlur($event)',
        '[class.focused]':'_focused'
    }
})
export class ToggleComponent extends BaseComponent implements OnInit {

    private _indexes: any = {};
    private _focused: boolean = false;

    @Input() name: string;
    @Input() type: string;
    @Input() listData: ListData;

    @Input()
    set value(values: any) {
        this.listData.selectItems(values);
    }
    get value() {
        return this.listData.getSelectedItems();
    }

    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
    
    constructor(protected _el: ElementRef) {
        super(_el);
    }

    ngOnInit() {
        this.listData.selectedItemChange.subscribe((e: any) => this.onSelectedItemChange(e));
    }

    onSelectedItemChange(e: any) {
        let els = this.getItemEls();
        let dom = this.util.dom();
        if (e.lastUnselectedIndexes) {
            for (let idx of e.lastUnselectedIndexes) {
                dom.removeCls(<HTMLElement>els[idx], 'selected');
            }
        }
        if (e.lastSelectedIndexes) {
            for (let idx of e.lastSelectedIndexes) {
                dom.addCls(<HTMLElement>els[idx], 'selected');
            }
        }
    }

    onPress(e: any) {
        let dom = this.util.dom();
        let el = dom.findParent(e.target,'.toggle__item')
        if (el) {
            this.listData.unselectAll();
            this.listData.selectItemByIndex(this.getIdx(el));
        }
    }

    getIdx(el: any) {
        return this.util.dom().parseClsInt(el,'toggle__item__idx__');
    }

    getItemEls() {
        return this.el.querySelector('.toggle__container').children;
    }

    onFocus(e: any) {
        this._focused = true;
    }

    onBlur(e: any) {
        this._focused = false;
    }
}