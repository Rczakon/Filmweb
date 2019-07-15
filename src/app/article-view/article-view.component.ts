import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {
  selectedArticle: Article;
  selectedArticleId: number;

  constructor(private articleService: ArticleService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    // this.articleService.articleSelected2
    // .subscribe(
    //   (article: Article) => {
    //     console.log('');
    //     this.selectedArticle = article;
    //   }
    // );
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.selectedArticleId = +params['id'];
    //       this.selectedArticle = this.articleService.getArticle(this.selectedArticleId);
    //     }
    //   )

    console.log(this.route.snapshot.params.id);

    this.articleService.getArticleById(this.route.snapshot.params.id);
    console.log(this.route.snapshot.params.id);

    this.articleService.articleSelected
      .subscribe((article: Article) => {
        this.selectedArticle = article;
        console.log(this.selectedArticle);
      });
  }

  showSelected() {
  }

}
