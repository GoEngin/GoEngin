import {Component, Input} from 'angular2/core';
import {IconComponent} from '../icon/icon.component';

@Component({
    selector: 'ge-button',
    moduleId: module.id,
    styleUrls: ['./button.component.css'],
    templateUrl: './button.component.html',
    directives: [IconComponent]
})

export class ButtonComponent {
    @Input() icon: string;
    @Input() label: string;
}
