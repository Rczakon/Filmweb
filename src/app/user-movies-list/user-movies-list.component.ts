import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-user-movies-list',
  templateUrl: './user-movies-list.component.html',
  styleUrls: ['./user-movies-list.component.css']
})
export class UserMoviesListComponent implements OnInit {

  constructor(private http: HttpClient, private loggingService: LoggingService) { }
  loggedUserId = this.loggingService.session.userId;
  serverResponse;
  movies = [];

  ngOnInit() {
  }

  getUserList() {
    this.http.get('http://localhost:3000/get-user-list/' + this.loggedUserId)
      .subscribe(receivedData => {
        this.serverResponse = receivedData;
        this.movies = this.serverResponse.movieList;
        console.log(this.serverResponse.movieList);
      });
  }

}
