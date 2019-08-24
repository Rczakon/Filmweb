import { EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from './article.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root',
})
export class LoggingService {

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private cookieService: CookieService) {}

  serverResponse: any;

  session = {
    serverMessage: null,
    loggedIn: false,
    userName: null,
    userId: null
  };

  sessionInfo = {
    sessionId: null
  };


  sendSessionInfo = new BehaviorSubject(this.session);

  loggingIn(formInput: any) {
    this.http.post('http://localhost:3000/logging-in', formInput)
    .subscribe((responseData) => {
      this.serverResponse = responseData;
      this.session.serverMessage = this.serverResponse.message;
      console.log('Wiadomość to: ' + this.serverResponse.sessionId);
      if (this.serverResponse.success) {
        this.session.loggedIn = true;
        this.session.serverMessage = this.serverResponse.message;
        this.session.userName = this.serverResponse.session.userName;
        this.session.userId = this.serverResponse.session.userId;

        this.cookieService.set( 'SessionKey', this.serverResponse.sessionId );
      }
    });
  }

  logOut() {
    this.sessionInfo.sessionId = this.cookieService.get('SessionKey');
    this.cookieService.delete('SessionKey');
    this.session.serverMessage = null;
    this.session.loggedIn = false;
    this.session.userName = null;
    this.session.userId = null;
    console.log(this.session.serverMessage);
    this.http.post('http://localhost:3000/logout-session', this.sessionInfo)
      .subscribe((receivedData) => {
        this.serverResponse = receivedData;
    });
  }

  getSession() {
    this.sessionInfo.sessionId = this.cookieService.get('SessionKey');
    console.log('Zamierzam pobrać sesję o nr ' + this.sessionInfo.sessionId);
    this.http.post('http://localhost:3000/get-session', this.sessionInfo)
      .subscribe((receivedData) => {
        this.serverResponse = receivedData;
        console.log('Oto dane: ' + this.serverResponse.message);
        if (this.serverResponse.success) {
          this.session.loggedIn = true;
          this.session.serverMessage = this.serverResponse.message;
          this.session.userName = this.serverResponse.session.userName;
          this.session.userId = this.serverResponse.session.userId;
          console.log(this.session);
          this.sendSessionInfo.next(this.session);
        } else {
          console.log('Brak sesji');
          this.session.serverMessage = this.serverResponse.message;
        }
      });
  }

  addCookie() {
    this.cookieService.delete('SessionKey');
    console.log('Cookie added(I hope so)');
  }
}
