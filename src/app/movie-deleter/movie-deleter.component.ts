import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-movie-deleter',
  templateUrl: './movie-deleter.component.html',
  styleUrls: ['./movie-deleter.component.css']
})
export class MovieDeleterComponent implements OnInit {

  movieList: Movie[];

  constructor(private movieService: MovieService, private http: HttpClient) { }

  ngOnChanges() {
    this.movieService. movieListSent
      .subscribe((movies: Movie[]) => {
        this.movieList = movies;
        console.log(movies);
      });
  }

  ngOnInit() {
    this.movieService.getMoviesFromServer();

    this.movieService.movieListSent
      .subscribe((movies: Movie[]) => {
        this.movieList = movies;
        console.log(movies);
      });
  }


  deleteMovie(movieId) {
    console.log(movieId);
    this.ngOnInit();
    this.http.delete('http://localhost:3000/delete-user/' + movieId)
      .subscribe((responseData) => {
        console.log(responseData);
        this.ngOnInit();
      });
    // $('.container').css('background-color', 'red');
  }

}
