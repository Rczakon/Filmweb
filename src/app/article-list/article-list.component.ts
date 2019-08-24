import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
  providers: []
})
export class ArticleListComponent implements OnInit {

  articleArray: Article[];
  loggedIn = false;
  currentUser = '';

  constructor(private articleService: ArticleService, private loggingService: LoggingService) {

  }


  ngOnInit() {
    // this.articleArray = this.articleService.getArticles();
    this.articleService.getArticlesFromServer();
    this.articleService.articleListSent
      .subscribe((articles: Article[]) => {
        this.articleArray = articles;
        console.log(articles);
      });
    this.loggingService.sendSessionInfo
      .subscribe((session: any) => {
        this.loggedIn = session.loggedIn;
        this.currentUser = session.userName;
      });

  }

}
