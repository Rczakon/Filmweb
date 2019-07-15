import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { extname } from 'path';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.css']
})
export class MovieViewComponent implements OnInit {
  exampleMovie = this.movieService.getExampleMovie();
  selectedMovie: Movie;
  selectedMovieId: number;

  constructor(private movieService: MovieService,
              private route: ActivatedRoute,
              public router: Router) { }

  ngOnInit() {
    // Working code:
    // this.movieService.movieSelected
    // .subscribe((movie: Movie) => {
    //   this.selectedMovie = movie;
    // });
    console.log(this.route.snapshot.params.id);

    this.movieService.getMovieById(this.route.snapshot.params.id);
    // console.log(this.movieService.getMovieById(this.route.snapshot.params.id));
    this.movieService.movieSelected
      .subscribe((movie: Movie) => {
        this.selectedMovie = movie;
        console.log(this.selectedMovie);
      });


  }

}
