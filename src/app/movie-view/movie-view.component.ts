import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { LoggingService } from '../logging.service';
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
  averageRating;
  serverResponse;
  // currentUserId;
  currentUsername;
  alreadyRated = false;
  nobodyLogged = false;
  currentUserRating = null;
  currentUserId = this.loggingService.session.userId;


  constructor(private movieService: MovieService,
              private route: ActivatedRoute,
              public router: Router,
              private http: HttpClient,
              private loggingService: LoggingService) {}

  ngOnInit() {
    // Working code:
    // this.movieService.movieSelected
    // .subscribe((movie: Movie) => {
    //   this.selectedMovie = movie;
    // });
    console.log(this.currentUserId);
    this.selectedMovieId = this.route.snapshot.params.id;
    // this.selectedMovie = null;
    this.movieService.getMovieById(this.route.snapshot.params.id);
    this.getAverageRating();
    // console.log(this.movieService.getMovieById(this.route.snapshot.params.id));
    this.movieService.movieSelected
      .subscribe((movie: Movie) => {
        this.selectedMovie = movie;
        // console.log(this.selectedMovie);
      });
    this.getCurrentRating();

    $('.fa-star').mouseover(function() {
        const coveredStarId = $(this).attr('id')[4];
        for (let i = 1; i <= coveredStarId; i++) {
          $('#star' + i).css('color', 'yellow');
        }
    });

    $('.fa-star').mouseout(function() {
        const coveredStarId = $(this).attr('id')[4];
        for (let i = 1; i <= coveredStarId; i++) {
          $('#star' + i).css('color', 'white');
        }
    });
  }

  addRating(starAmount) {
    // this.alreadyRated = false;
    this.nobodyLogged = false;
    // this.currentUserId = this.loggingService.session.userId;
    console.log(starAmount + ' stars');
    const ratingInfo = {
      currentRating: starAmount,
      movieTitle: this.selectedMovie.title,
      movieId: this.selectedMovieId,
      movieCover: this.selectedMovie.cover,
      userId: this.currentUserId
    };

    if (this.alreadyRated !== true) {
      this.http.post('http://localhost:3000/add-rating', ratingInfo)
      .subscribe((responseData) => {
        this.serverResponse = responseData;
        // this.averageRating = this.serverResponse.averageRating;
        console.log(this.serverResponse.message);
        if (this.serverResponse.alreadyRated) {
          this.alreadyRated = true;
        }
        if (this.serverResponse.nobodyLogged) {
          this.nobodyLogged = true;
        }
        this.getAverageRating();
    });
    } else {
      this.http.post('http://localhost:3000/update-rating', ratingInfo)
        .subscribe((responseData) => {
          this.serverResponse = responseData;
          console.log(this.serverResponse.message);
          this.currentUserRating = this.serverResponse.newRating;
          this.getAverageRating();
        });
    }
  }

  getAverageRating() {
    const path = 'http://localhost:3000/get-average/' + this.selectedMovieId;
    console.log('Obecna ścieżka: ' + path);
    this.http.get(path)
      .subscribe(serverResponse => {
        this.serverResponse = serverResponse;
        this.averageRating = this.serverResponse.averageRating;
      });
  }

  getCurrentRating() {
    this.currentUserId = this.loggingService.session.userId;
    this.currentUsername = this.loggingService.session.userName;

    const userInformation = {
      id: this.currentUserId,
      username: this.currentUsername,
      movieId: this.selectedMovieId
    };

    if (this.currentUserId === null) {
      console.log('Nikogo nie ma w domu!');
    } else {
      console.log("będę skakał");
      this.http.post('http://localhost:3000/get-rating', userInformation)
        .subscribe((responseData) => {
          this.serverResponse = responseData;
          // console.log("Ocena!!!!!!!!!!!!!");
          // console.log('Obecna ocena: ' + this.serverResponse.currentUserRating);
          this.currentUserRating = this.serverResponse.currentUserRating;
          if (this.currentUserRating !== undefined) {
            this.alreadyRated = true;
          }
        });
    }
  }

}
