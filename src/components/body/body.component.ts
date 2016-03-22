import {Component} from 'angular2/core';

//If the component doesn't have moduleId, 404 error.
@Component({
    selector: 'kc-body',
    moduleId: module.id,
    styleUrls: ['./body.component.css'],
    templateUrl: './body.component.html'
})

export class BodyComponent {}
