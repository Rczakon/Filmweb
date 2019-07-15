import { EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from './article.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {

  constructor(private http: HttpClient) {}

  batmanPath = '../assets/images/batman.jpg';
// tslint:disable-next-line: max-line-length
  shrekPath = 'https://is1-ssl.mzstatic.com/image/thumb/Video62/v4/f6/cf/41/f6cf4166-fce4-ba28-075f-bfa327b66f37/mzm.jqiredrw.lsr/268x402.jpg';
  baldPath = 'https://i.iplsc.com/wczesne-lysienie-moze-oznaczac-problemy-z-ukladem-krazenia/00028IG5PAAJWXY2-C122-F4.jpg';
// tslint:disable-next-line: max-line-length
  articleContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  // private articles: Article[] = [
  //   {id: 0, articleTitle: 'Robert Pattinson nowym Batmanem', description: this.articleContent, imagePath: this.batmanPath},
  //   {id: 1, articleTitle: 'Powstanie piąta część Shreka?', description: this.articleContent, imagePath: this.shrekPath},
  //   {id: 2, articleTitle: 'Magiczny środek na porost włosów', description: this.articleContent, imagePath: this.baldPath},
  //   {id: 3, articleTitle: 'Robert Pattinson nowym Batmanem', description: this.articleContent, imagePath: this.batmanPath},
  //   {id: 4, articleTitle: 'Powstanie piąta część Shreka?', description: this.articleContent, imagePath: this.shrekPath},
  //   {id: 5, articleTitle: 'Magiczny środek na porost włosów', description: this.articleContent, imagePath: this.baldPath}
  // ];

  articles: Article[] = [];

  // articleSelected = new EventEmitter<Article>();
  articleSelected = new BehaviorSubject(this.articles[2]);
  articleListSent = new BehaviorSubject(this.articles);
  singleArticle;

  getArticlesFromServer() {
    // return this.articles.slice();
    this.http
      .get<{message: string, articles: any}>(
        'http://localhost:3000/get-article-list'
      )
      .pipe(map((articleData) => {
        return articleData.articles.map(article => {
          return {
            id: article._id,
            articleTitle: article.articleTitle,
            description: article.description,
            imagePath: article.imagePath
          };
        });
      }))
      .subscribe((transformedArticles) => {
        this.articles = transformedArticles;
        console.log(transformedArticles);
        console.log('Articles successfully fethed!');
        this.articleListSent.next(this.articles);
      });
  }

  getArticle(id: number) {
    return this.articles[id];
  }

  getArticleById(articleId: number) {
    const searchedPath = 'http://localhost:3000/get-single-article/' + articleId;
    this.http
      .get<{article: Article}>(
      searchedPath
    )
    .subscribe((article) => {
      this.singleArticle = article;
      console.log(this.singleArticle);
      this.articleSelected.next(this.singleArticle.message);
    });
  }

  sendArticle(receivedArticle: Article) {
    // this.articleSelected.emit(receivedArticle);
    this.articleSelected.next(receivedArticle);
  }
}
