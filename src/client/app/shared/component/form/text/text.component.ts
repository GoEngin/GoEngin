import { Component, Input, Output, EventEmitter, ElementRef, Renderer, Inject } from '@angular/core';

@Component({
    selector: 'mc-text',
    moduleId: module.id,
    styleUrls: ['./text.component.css'],
    templateUrl: './text.component.html',
    host: {
        '(click)':'onPress($event)'
    }
})
export class TextComponent {

    @Input() name: string;
    @Input() value: any = '';
    @Input() placeHolderIcon: string;
    @Input() placeHolderText: string;

    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() focus: EventEmitter<any> = new EventEmitter();
    @Output() blur: EventEmitter<any> = new EventEmitter();

    private _type: string = 'text';

    @Input() 
    set type(value: string) {
        this._type = value;
    }

    get type() {
        return this._type;
    }

    onPress(e: any) {}

    onKeyUp(e: KeyboardEvent) {
        //recommend strong typing, weak -> e.event.target
        let value = (<HTMLInputElement>event.target).value;
        if (value !== this.value) {
            e.stopPropagation();
            this.value = value;
            this.valueChange.emit(this.value); 
        }
    }

    onFocus(e: any) {
        this.focus.emit(e);
    }

    onBlur(e: any) {
        this.blur.emit(e);
    }
}