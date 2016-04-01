import {Component, Input} from 'angular2/core';

@Component({
    selector: 'ge-input',
    moduleId: module.id,
    styleUrls: ['./input.component.css'],
    templateUrl: './input.component.html'
})

export class InputComponent {
	@Input() type: string;
	@Input() placeholder: string;
}
