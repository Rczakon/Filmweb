import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-adder',
  templateUrl: './movie-adder.component.html',
  styleUrls: ['./movie-adder.component.css']
})
export class MovieAdderComponent implements OnInit {

  movieAddForm: FormGroup;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.movieAddForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
      genre: new FormControl(null),
      director: new FormControl(null),
      releaseDate: new FormControl(null),
      cover: new FormControl(null),
      cast: new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.movieAddForm.value);
    const formValues = this.movieAddForm.value;
    this.http.post('http://localhost:3000/add-movie', formValues)
      .subscribe((responseData) => {
        console.log(responseData);
    });
  }

}
