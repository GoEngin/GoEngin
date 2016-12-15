//TODO: autofill is destroying UI design -_-; 
//This component covers all of the form fields
//The real input field comes from seperated components. This compoment is a container for that.
import { Component, Input, Output, EventEmitter, ElementRef, Inject, ViewChild, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { TextComponent } from '../text/text.component';
import { ToggleComponent } from '../toggle/toggle.component';
import { Validator } from '../../../util/validator';
import { ListData } from '../../model/listdata';

const CONS: any = {
    dataConfig: {
        YN: {
            valueOnly: true,
            items: [
                {'id': true, 'displayName': 'Yes'},
                {'id': false, 'displayName': 'No', 'selected':true}
            ]
        }
    }
}

//If the component doesn't have moduleId, 404 error.
@Component({
    selector: 'mc-input',
    moduleId: module.id,
    styleUrls: ['./input.component.css'],
    templateUrl: './input.component.html',
    host: {
        '[class.focused]': '_focused',
        '[class.icon__label]': 'iconLabel',
        '[class.has-label]': 'label',
        '[class.invalid]': '!_valid',
        '[class.changed]': '_changed',
        '[class.has-value]': '_value',
        '[class.hidden]': 'hidden',
        '[class.disabled]': 'disabled'
    }
})

export class InputComponent extends BaseComponent implements OnInit {

    @ViewChild(TextComponent) fieldTextCmp: TextComponent;
    @ViewChild(ToggleComponent) fieldToggleCmp: ToggleComponent;

    //form field base
    private _focused: boolean = false;
    private _value: any;
    private _valid: boolean = true;
    private _changed: boolean = false;
    private _fieldCmp: any;
    private _rendered: boolean = false;
    private _isToggle: boolean = false;

    @Input() frm: any;
    @Input() type: string = 'text';
    @Input() name: string;
    @Input() validators: any;
    @Input() label: string;
    @Input() iconLabel: string;
    @Input() placeholder: string;
    @Input() errorMessage: string;
    @Input() help: boolean = false;
    @Input() iconHelp: string = 'question';
    @Input() hidden: boolean = false;
    @Input() disabled: boolean = false; //readonly
    @Input() listData: ListData;

    @Input() 
    set hiddenAndDisabled(value: boolean) {
        this.hidden = value;
        this.disabled = value;
    }

    @Input()
    get valid() {
        return this._valid;
    }

    @Input()
    set value(value: any) {
        if (!this.disabled && this._value !== value) {
            let oldValue = this._value;
            this._value = value;
            // value can be from fieldCmp.
            this._updateFieldValue(value);
            this._validate(value);
            this.valueChange.emit({target:this, newValue:this._value, oldValue:oldValue});
        }
    }
    get value() {
        return this._value;
    }

    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    constructor( protected _el: ElementRef) {
        super(_el);
    }

    ngOnInit() {
        this._initData();
    }

    private _initData() {
        switch (this.type) {
            case "boolean":
                this.listData = new ListData(CONS.dataConfig.YN);
                break;
        }
    }

    private _getCmpName() {
        let cmpName = 'text';
        switch (this.type) {
            case "boolean":
            case "toggle":
                cmpName = 'toggle';
                break;
        }
        return cmpName;
    }

    private _getFieldComponent() {
        if (!this._fieldCmp) { 
            let cmp: any;
            switch (this._getCmpName()) {
                case "text":
                    cmp = this.fieldTextCmp;
                    break;
                case "toggle":
                    cmp = this.fieldToggleCmp;
                    break;
            }
            this._fieldCmp = cmp;
        }
        return this._fieldCmp;
    }

    private _validate(value: any) {
        let result: any = Validator.validate(value, this.validators, this.frm);
        if (result) {
            //TODO: show an error message by the result. The result has the detail.
            //Error message should get from i18n with params.
            this.errorMessage = result.error;
            this._valid = false;
        } else {
            this._valid = true;
        }
        return this._valid;
    }

    private _updateFieldValue(value: any) {
        let fc = this._getFieldComponent();
        if (fc.value !== this._value) {
            fc.value = this._value;
        }
    }

    validate() {
        if (!this.disabled) {
            return this._validate(this.value);
        }
        return true;
    }

    onValueChange(value: any) {
        this.value = value;
    }

    onFocus(e: any) {
        this._focused = true;
    }

    onBlur(e: any) {
        this._focused = false;
    }
}