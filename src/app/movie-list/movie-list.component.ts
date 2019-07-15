import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movieList: Movie[];

  private receivedMessage;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getMoviesFromServer();

    this.movieService.movieListSent
      .subscribe((movies: Movie[]) => {
        this.movieList = movies;
        console.log(movies);
      });
  }

  // onSelected(clickedMovie: Movie) {
  //   this.movieService.sendMovie(clickedMovie);
  // }

}
