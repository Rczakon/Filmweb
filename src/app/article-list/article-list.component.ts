import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
  providers: []
})
export class ArticleListComponent implements OnInit {

  articleArray: Article[];

  constructor(private articleService: ArticleService) {

  }


  ngOnInit() {
    // this.articleArray = this.articleService.getArticles();
    this.articleService.getArticlesFromServer();
    this.articleService.articleListSent
      .subscribe((articles: Article[]) => {
        this.articleArray = articles;
        console.log(articles);
      });
  }

}
