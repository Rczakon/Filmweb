import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      'username': new FormControl(null),
      'email': new FormControl(null),
      'passwordOnce': new FormControl(null),
      'passwordTwice': new FormControl(null),
      'accepted': new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.registerForm.value);
    const formValues = this.registerForm.value;
    this.http.post('http://localhost:3000/add-user', formValues)
      .subscribe((responseData) => {
        console.log(responseData);
      });
    // this.http.post('http://localhost:3000/add-user/' + newUser)

  }

}
