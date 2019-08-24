import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  serverResponse: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'passwordOnce': new FormControl(null, [Validators.required]),
      'passwordTwice': new FormControl(null, [Validators.required]),
      'accepted': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    // console.log(this.registerForm.value);
    const formValues = this.registerForm.value;
    this.http.post('http://localhost:3000/add-user', formValues)
      .subscribe((responseData) => {
        console.log(responseData);
        this.serverResponse = responseData;
      });
    // this.http.post('http://localhost:3000/add-user/' + newUser)

  }

}
