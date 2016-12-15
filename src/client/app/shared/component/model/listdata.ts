import { Output, EventEmitter } from '@angular/core';
import { Util } from '../../util/util';
//If you want to pass data by a templete property, you need to define a model for the data. Unless you get "[Object Object]" instead of the data
//The property is a string type except the model object.
//A boolean value is from a property is string type. Need to convert it to boolean value.
export class ListData {

	private _indexes: any;
	private _items: any;
	private _valueField: any;
	private _displayField: string;
    private _iconField: string;
    private _defaultValue: any;
    private _multiSelect: boolean;
    private _selectedIndexes: any;
    //value will be selected values. if not, selected items will be value.
    private _valueOnly: boolean;
    private _util: Util;

    @Output() selectedItemChange: EventEmitter<any> = new EventEmitter<any>();

	constructor(public config: any) {
        this._util = new Util();
        this._initConfig(config);
        this._indexing();
        this._selectDefaultValue();
	}

	private _initConfig(config: any) {
		this._items = config.items ? config.items : [];
		this._valueField = config.valueField ? config.valueField : 'id';
		this._displayField = config.displayField ? config.displayField : 'displayName';
        this._iconField = config.iconField ? config.iconField : '';
        this._defaultValue = config.defaultValue;
        this._multiSelect = config.multiSelect ? true : false;
        this._valueOnly = config.valueOnly ? true : false;
        this._selectedIndexes = [];
	}

    //for finding idx, for reducing loops.
    private _indexing() {
        let items = this._items;
        let idxes: any = {};
        let vField = this._valueField;
        for (let idx in items) {
            items[idx].__idx__ = idx;
            idxes[items[idx][vField]] = idx;
            if (items[idx].selected) {
                this._selectedIndexes[idx] = true;
            }
        }
        this._indexes = idxes;
    }

    private _selectDefaultValue() {
        if (!this._util.isEmpty(this._defaultValue)) {
            this.selectItem(this._defaultValue);
        }
    }

    getIdx(value: any) {
        let idx = this._indexes[value];
        if (this._util.isEmpty(idx)) {
            idx = -1;
        }
        return parseInt(idx);
    }

    getItems() {
        return this._items;
    }

    getValueField() {
        return this._valueField;
    }

    getDisplayField() {
        return this._displayField;
    }

    getIconField() {
        return this._iconField;
    }

    isMultiSelect() {
        return this._multiSelect;
    }

    selectItemByIndex(idx: number) {
        if (idx < 0) return;
        this._items[idx].selected = true;
        this._selectedIndexes[idx] = true;
        this.selectedItemChange.emit({selectedIndexes:this._selectedIndexes,lastSelectedIndexes:[idx]});
    }

    unselectItemByIndex(idx: number) {
        if (idx < 0) return;
        this._items[idx].selected = false;
        this._selectedIndexes[idx] = null;
        this.selectedItemChange.emit({selectedIndexes:this._selectedIndexes,lastUnselectedIndexes:[idx]});
    }

    selectItem(value: any) {
        this.selectItems([value]);
    }

    selectItems(values: any) {
        let unselected: boolean = false;
        if (!Array.isArray(values)) {
            values = [values];
        }
        let valueOnly = this._valueOnly;
        let vField = this._valueField;
        let lastSelectedIndexes: any = [];
        for (let value of values) {
            if (!valueOnly) {
                value = value[vField];
            }
            let idx = this.getIdx(value);
            if (idx > -1) {
                if (!unselected) {
                    this.unselectAll();
                    unselected = true;
                }
                this._items[idx].selected = true;
                this._selectedIndexes[idx] = true;
                lastSelectedIndexes.push(idx);
            }
        }
        this.selectedItemChange.emit({selectedIndexes:this._selectedIndexes,lastSelectedIndexes:lastSelectedIndexes});
        return lastSelectedIndexes;
    }

    unselectAll() {
        let items = this._items;
        let selectedIndexes = this._selectedIndexes;
        let unselectedIndexes: any = [];
        let lastUnselectedIndexes: any = [];
        for (let idx in selectedIndexes) {
            if (selectedIndexes[idx]) {
                items[idx].selected = false;
                unselectedIndexes.push(idx);
                selectedIndexes[idx] = null;
                lastUnselectedIndexes.push(idx);
            }
        }
        this.selectedItemChange.emit({selectedIndexes:this._selectedIndexes,lastUnselectedIndexes:lastUnselectedIndexes});
        return lastUnselectedIndexes;
    }

    getSelectedItems() {
        return this._valueOnly ? this._getSelectedValues() : this._getSelectedItems();
    }

    _getSelectedItems() {
        let _selectedItems: any = [];
        let items = this._items;
        let selectedIndexes = this._selectedIndexes;
        for (let idx in selectedIndexes) {
            if (selectedIndexes[idx]) {
                _selectedItems.push(items[idx]);
            }
        }
        return _selectedItems;
    }

    _getSelectedValues() {
        let _selectedValues: any = [];
        let valueField = this._valueField;
        let items = this._items;
        let selectedIndexes = this._selectedIndexes;
        for (let idx in selectedIndexes) {
            if (selectedIndexes[idx]) {
                _selectedValues.push(items[valueField]);
            }
        }
        return _selectedValues;
    }
}