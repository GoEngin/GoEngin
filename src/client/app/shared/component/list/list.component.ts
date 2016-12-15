import { Component, Input, Output, EventEmitter, ElementRef, Inject } from '@angular/core';
import { BaseComponent } from '../base.component';
import { Util } from '../../util/util';

const IconType = {
    Expand: "expand",
    Select: "select",
    Toggle: "toggle"
}

@Component({
    selector: 'mc-list',
    moduleId: module.id,
    styleUrls: ['list.component.css'],
    templateUrl: 'list.component.html',
    host: {
        '(click)' : 'onPress($event)'
    }
})

export class ListComponent extends BaseComponent {

    private _toggledItems: any[] = [];
    private _selectedListItem: any;
    private _detailHeight: number;
    private _columns: any[];
    private _iconTypeInfo: any = {};
    private _util: Util;

    @Input() cls: string;
    @Input() items: any[];
    @Input() headerCls: string;
    @Input() itemsHeader: boolean;
    @Input() idField: string = 'id';
    @Input()
    set columns(value: any) {
        this._columns = value;
        this._columns.forEach((column: any) => {
            if (column.iconType) {
                this._iconTypeInfo[column.iconType] = {
                    icon: column.icon,
                    toggled: column.iconToggled
                }
            }
        });
    }
    get columns() {
        return this._columns;
    }

    constructor(protected _el: ElementRef) { 
        super(_el);
        this._util = new Util();
    }

    onPress(e: any) {
        if (e.target.tagName.toLowerCase() === 'mc-icon') {
            switch (e.target.dataset.icontype) {
                case IconType.Select:
                    this.updateState(e.target, IconType.Select);
                    e.stopPropagation();
                    break;
                case IconType.Toggle:
                    this.updateState(e.target, IconType.Toggle);
                    e.stopPropagation();
                    break;
                case IconType.Expand:
                    this.updateState(e.target, IconType.Expand);
                    e.stopPropagation();
                    break;
               
            }
        }
    }

    getItem(el: any) {
        let id = el.dataset.id;
        let items = this.items;
        let idField = this.idField;
        let item: any;
        for ( let i=0; i < items.length; i++ ) {
            if (items[i][idField] + '' === id) {
                item = items[i];
                break;
            }
        }
        return item;
    }

    getSelectedItem() {
        return this._selectedListItem ? this._selectedListItem.item : null;
    }

    getToggledItems() {
        return this._toggledItems;
    }

    updateToggledItems(el: HTMLElement, item: any, iconEl: HTMLElement) {
        let added = this._util.dom().toggleCls(el,'toggled');
        if (!added) {
            let items = this._toggledItems;
            let idx: number = -1;
            let idField = this.idField;
            for ( let i = 0; i < items.length; i++ ) {
                if (items[i][idField] === item[idField]) {
                    idx = i;
                    break;
                }
            }
            if (idx > -1) {
                this._toggledItems.splice(idx,1);
            }
        } else {
            this._toggledItems.push(item);
        }
        this.updateIcon(IconType.Toggle, iconEl, added);
    }

    updateSelectedItem(el: HTMLElement, item: any, iconEl: HTMLElement) {
        if (this._selectedListItem) {
            this._util.dom().removeCls(this._selectedListItem.el, 'selected');
        }
        this._util.dom().addCls(el,'selected');
        this._selectedListItem = {el: el, item: item};
    }

    updateExpandedItem(el: HTMLElement, iconEl: HTMLElement) {
        let added = this._util.dom().toggleCls(el, 'expanded');
        let detailEl: any = el.getElementsByClassName('listitem__detail')[0];
        if (!this._detailHeight) {
            let size = this._util.dom().getSize(detailEl);
            this._detailHeight = size.height;
        }
        this.updateIcon(IconType.Expand, iconEl, added);
        if (detailEl) {
            //for animation, that is needed a delay.
            setTimeout(() => detailEl.style.height = added ? this._detailHeight + 'px' : '0px',0);
        }
    }

    updateIcon(iconType: string, iconEl: HTMLElement, toggled: boolean) {
        let icon = this._iconTypeInfo[iconType];
        if (icon.toggled) {
            let newCls = toggled ? icon.toggled : icon.icon;
            let oldCls = toggled ? icon.icon : icon.toggled;
            this._util.dom().replaceCls(iconEl, 'icon-' + oldCls, 'icon-' + newCls);
        }
    }

    updateState(iconEl: any, iconType: string) {
        let el = this._util.dom().findParent(iconEl, 'mc-listitem',10);
        let item = this.getItem(el);
        switch (iconType) {
            case IconType.Toggle:
                this.updateToggledItems(el,item,iconEl);
                break;
            case IconType.Select:
                this.updateSelectedItem(el,item,iconEl);
                break;
            case IconType.Expand:
                this.updateExpandedItem(el,iconEl);
                break;
        }
    }

}