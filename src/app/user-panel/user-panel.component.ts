import { Component, OnInit } from '@angular/core';
import { LoggingService } from '../logging.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  currentUser;
  isEditing = false;
  serverResponse;
  loggedUserId = this.loggingService.session.userId;
  userInfoForm: FormGroup;

  userData = {
    name: null,
    surname: null,
    date: null,
    email: null
  };

  constructor(private loggingService: LoggingService, private http: HttpClient) { }

  ngOnInit() {
    this.currentUser = this.loggingService.session.userName;
    this.getUserData();

    this.userInfoForm = new FormGroup({
      'firstName': new FormControl(null),
      'lastName': new FormControl(null),
      'date': new FormControl(null),
      'email': new FormControl(null)
    });
  }

  startEditing() {
    this.isEditing = true;
  }

  stopEditing() {
    this.isEditing = false;
  }

  getUserData() {
    this.http.get('http://localhost:3000/get-user/' + this.loggedUserId)
    .subscribe(receivedData => {
      this.serverResponse = receivedData;
      console.log(this.serverResponse.userData);
      this.userData.email = this.serverResponse.userData.emailAddress;
      this.userData.name = this.serverResponse.userData.name;
      this.userData.surname = this.serverResponse.userData.surname;
      this.userData.date = this.serverResponse.userData.birthDate;
    });
  }

  onSubmit() {
    this.http.post('http://localhost:3000/add-user-info/' + this.loggedUserId, this.userInfoForm.value)
    .subscribe((responseData) => {
      this.serverResponse = responseData;
      console.log(this.serverResponse);
    });
  }

}
