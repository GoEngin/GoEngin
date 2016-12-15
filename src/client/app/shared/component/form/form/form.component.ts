import { Component, ContentChildren, QueryList, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { Validator } from '../../../util/validator'

@Component({
    selector: 'mc-form',
    moduleId: module.id,
    styleUrls: ['./form.component.css'],
    templateUrl: './form.component.html'
})

export class FormComponent implements AfterViewInit {

    private _valid: boolean = true;
    private _values: any;
    private _isViewInit: boolean = false;

    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    @ContentChildren(InputComponent) inputCmps: QueryList<InputComponent>;

    ngAfterViewInit() {
        this.bindEvents();
    }

    bindEvents() {
        this.inputCmps.toArray().forEach(cmp => {
            cmp.frm = this;
            cmp.valueChange.subscribe((e: any) => {
                this.valueChange.emit({target:this, field: e.target, newValue: e.newValue, oldValue: e.oldValue, valid: this.isValid()});
            });
        });
    }

    getValue(fieldName:string) {
        this._values = this._values || {};
        let value:any = null;
        this.inputCmps.toArray().forEach(cmp => {
            if (!cmp.disabled) {
                if (fieldName === cmp.name) {
                    value = cmp.value;
                    this._values[cmp.name] = value;
                }
            }
        });
        return value;
    }

    getValues() {
        this._values = {};
        this.inputCmps.toArray().forEach(cmp => {
            if (!cmp.disabled) {
                this._values[cmp.name] = cmp.value;
            }
        });
        return this._values;
    }

    setValues(values: any, validators: any) {
        setTimeout(() => {
            this._setValues(values, validators);
        });
    }

    private _setValues(values: any, validators?: any) {
        if (values) {
            this.inputCmps.toArray().forEach(cmp => {
                if (!cmp.disabled) {
                    if (validators) {
                        let vs = validators[cmp.name]
                        if (vs) {
                            cmp.validators = vs;
                        }
                    }
                    cmp.value = values[cmp.name];
                }
            });
        }
    }

    validate() {
        let valid: boolean = true;
        this.inputCmps.toArray().forEach(cmp => {
            if (!cmp.disabled) {
                if(!cmp.validate()) {
                    valid = false;
                }
            }
        });
        return valid;
    }

    isValid() {
        let valid: boolean = true;
        this.inputCmps.toArray().forEach(cmp => {
            if (!cmp.disabled) {
                if (valid) {
                    valid = cmp.valid === false ? false : true;
                }
            }
        });
        this._valid = valid;
        return this._valid;
    }
}