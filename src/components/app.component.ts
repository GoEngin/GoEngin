import {Component, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {SidebarComponent} from './view/main/sidebar/sidebar.component';
import {HeaderComponent} from './view/main/header/header.component';
import {BodyComponent} from './view/main/body/body.component';

@Component({
  selector: 'ge-app',
  viewProviders: [],
  moduleId: module.id,
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, SidebarComponent, HeaderComponent, BodyComponent]
})

@RouteConfig([
//   { path: '/',      name: 'Home',  component: HomeComponent  },
//   { path: '/about', name: 'About', component: AboutComponent }
])

export class AppComponent {}
