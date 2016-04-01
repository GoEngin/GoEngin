import {Component, Input} from 'angular2/core';

@Component({
    selector: 'ge-icon',
    moduleId: module.id,
    styleUrls: ['./icon.component.css'],
    templateUrl: './icon.component.html'
})

export class IconComponent {
	@Input() isMaterial: boolean;
    @Input() name: string;
}
