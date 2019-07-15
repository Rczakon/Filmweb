import { Component } from '@angular/core';
import { ArticleService } from './article.service';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ArticleService, MovieService]
})
export class AppComponent {
  title = 'my-filmweb';
}
