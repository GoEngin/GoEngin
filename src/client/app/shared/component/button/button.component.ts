import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'mc-button',
    moduleId: module.id,
    styleUrls: ['button.component.css'],
    templateUrl: 'button.component.html',
    host: {
        '[class.disabled]': 'disabled',
        '[class.hidden]': 'hidden',
        '[class.hasLabel]': 'label',
        '[class.hasImage]': 'src'
    }
})

export class ButtonComponent {
    @Input() icon: string;
    @Input() src: string;
    @Input() label: string;
    @Input() disabled: boolean;
    @Input() hidden: boolean;
}
