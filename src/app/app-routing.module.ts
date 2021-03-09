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
import { ArticleAdderComponent } from './article-adder/article-adder.component';
import { MovieAdderComponent } from './movie-adder/movie-adder.component';
import { MovieDeleterComponent } from './movie-deleter/movie-deleter.component';
import { UserPanelComponent } from './user-panel/user-panel.component';

const routes: Routes = [
  { path: '', component: MainViewComponent},
  // { path: 'article-details', component: ArticleViewComponent},
  { path: 'article/:id', component: ArticleViewComponent},
  { path: 'movie-list', component: MovieListComponent},
  { path: 'register', component: RegistrationComponent},
  { path: 'login', component: LoggingComponent},
  { path: 'movie/:id', component: MovieViewComponent},
  { path: 'add-article', component: ArticleAdderComponent},
  { path: 'add-movie', component: MovieAdderComponent},
  { path: 'delete-movie', component: MovieDeleterComponent},
  { path: 'user-panel/:userId', component: UserPanelComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
