import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { MainViewComponent } from './main-view/main-view.component';
import { ArticleComponent } from './article/article.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { MovieViewComponent } from './movie-view/movie-view.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoggingComponent } from './logging/logging.component';

const routes: Routes = [
  { path: '', component: MainViewComponent},
  // { path: 'article-details', component: ArticleViewComponent},
  { path: 'article/:id', component: ArticleViewComponent},
  { path: 'movie-list', component: MovieListComponent},
  { path: 'register', component: RegistrationComponent},
  { path: 'login', component: LoggingComponent},
  { path: 'movie/:id', component: MovieViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
