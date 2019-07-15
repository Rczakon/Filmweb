import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
  }

  onSelected() {
    //console.log(this.article);
    //this.articleService.articleSelected.emit(this.article);
    // this.articleService.sendArticle(this.article);
  }
}
