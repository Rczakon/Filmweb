import { EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from './article.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {

  constructor(private http: HttpClient) {}

  comments = [];
  serverResponse;
  sentComments = new BehaviorSubject(this.comments);

  getComments(subjectId: string) {
    this.http.get('http://localhost:3000/get-comments/' + subjectId)
    .subscribe((responseData) => {
      this.serverResponse = responseData;
      // this.comments = this.serverResponse.comments;
      console.log("Komentarze to:");
      this.comments = this.serverResponse.comments;
      this.sentComments.next(this.comments);
    });
  }

  addComment(movieId, currentUserId, currentUserName, commentContent) {
    const commentData = {
      movieId: movieId,
      userId: currentUserId,
      userName: currentUserName,
      content: commentContent
    };
    this.http.post('http://localhost:3000/add-comment', commentData)
    .subscribe((responseData) => {
      this.serverResponse = responseData;
      console.log(this.serverResponse);
      this.getComments(movieId);
    });
  }

}
