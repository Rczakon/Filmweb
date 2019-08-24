import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {

  constructor(private http: HttpClient, private loggingService: LoggingService) { }

  signupForm: FormGroup;
  serverResponse: any;

  currentSession = {
    serverMessage: '',
    loggedIn: false,
    userName: '',
    userId: ''
  };

  ngOnInit() {

    this.currentSession.serverMessage = null;

    this.signupForm = new FormGroup({
      'username': new FormControl(null),
      'password': new FormControl(null)
    });

    this.loggingService.sendSessionInfo
      .subscribe((session: any) => {
        this.currentSession = session;
      });
  }

  onSubmit() {
    // console.log(this.signupForm);
    const formValues = this.signupForm.value;
    this.loggingService.loggingIn(formValues);
  }


}
