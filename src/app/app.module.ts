import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { SearchToolComponent } from './search-tool/search-tool.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article/article.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MainViewComponent } from './main-view/main-view.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { MovieViewComponent } from './movie-view/movie-view.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { SiderComponent } from './sider/sider.component';
import { FooterComponent } from './footer/footer.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoggingComponent } from './logging/logging.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ArticleAdderComponent } from './article-adder/article-adder.component';
import { MovieAdderComponent } from './movie-adder/movie-adder.component';
import { PersonAdderComponent } from './person-adder/person-adder.component';
import { MovieDeleterComponent } from './movie-deleter/movie-deleter.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { CookieService } from 'ngx-cookie-service';
import { UserMoviesListComponent } from './user-movies-list/user-movies-list.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderMenuComponent,
    SearchToolComponent,
    ArticleListComponent,
    ArticleComponent,
    MainViewComponent,
    ArticleViewComponent,
    MovieViewComponent,
    MovieListComponent,
    CommentSectionComponent,
    SiderComponent,
    FooterComponent,
    RegistrationComponent,
    LoggingComponent,
    ArticleAdderComponent,
    MovieAdderComponent,
    PersonAdderComponent,
    MovieDeleterComponent,
    UserPanelComponent,
    UserMoviesListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
