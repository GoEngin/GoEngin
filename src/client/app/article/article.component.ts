import { Component } from '@angular/core';
@Component({
	moduleId: module.id,
	selector: 'mc-article',
	styleUrls: ['article.component.css'],
	templateUrl: 'article.component.html',
	host: {
		'(click)':'onPress($event)'
	}
})
export class ArticleComponent {
	onPress(e: any) {

	}
}
