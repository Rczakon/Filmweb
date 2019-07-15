import { EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from './movie.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class MovieService {

  constructor(private http: HttpClient) {}

  movies: Movie[] = [];

  movieSelected = new BehaviorSubject(this.movies[2]);
  movieListSent = new BehaviorSubject(this.movies);
  receivedMessage;
  singleMovie;

  getExampleMovie() {
    return this.movies[0];
  }

  getMovies() {
    return this.movies.slice();
  }

  getMoviesFromServer() {
    console.log('Trying to get movies from server...');
    this.http
      .get<{message: string, movies: any}>(
        'http://localhost:3000/get-movies-list'
      )
      .pipe(map((movieData) => {
        return movieData.movies.map(movie => {
          return {
            id: movie._id,
            title: movie.title,
            genre: movie.genre,
            description: movie.description,
            director: movie.director,
            releaseDate: movie.releaseDate,
            cover: movie.cover,
            cast: movie.cast,
          };
        });
      }))
      .subscribe((transformedMovies) => {
        this.movies = transformedMovies;
        console.log(transformedMovies);
        console.log('Movies sucessfully loaded!');
        this.movieListSent.next(this.movies);
      });
  }

  sendMovie(receivedMovie: Movie) {
    this.movieSelected.next(receivedMovie);
  }

  getMovieById(movieId: number) {
      const searchedPath = 'http://localhost:3000/get-single-movie/' + movieId;
      this.http
        .get<{movie: Movie}>(
          searchedPath
        )
        .subscribe((movie) => {
          this.singleMovie = movie;
          console.log(this.singleMovie.message);
          this.movieSelected.next(this.singleMovie.message);
        });
  }
}
