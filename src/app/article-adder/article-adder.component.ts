import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-article-adder',
  templateUrl: './article-adder.component.html',
  styleUrls: ['./article-adder.component.css']
})
export class ArticleAdderComponent implements OnInit {

articleAddForm: FormGroup;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.articleAddForm = new FormGroup({
      'articleTitle': new FormControl(null),
      'articleContent': new FormControl(null),
      'articleCover': new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.articleAddForm.value);
    const formValues = this.articleAddForm.value;
    this.http.post('http://localhost:3000/add-article', formValues)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }
}
