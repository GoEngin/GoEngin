import {Component} from 'angular2/core';
import {SearchComponent} from '../../../common/search/search.component';
import {ButtonComponent} from '../../../common/button/button.component';

@Component({
    selector: 'ge-header',
    moduleId: module.id,
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html',
    directives: [ButtonComponent, SearchComponent]
})

export class HeaderComponent {}
