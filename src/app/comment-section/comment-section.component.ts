import { Component, OnInit, Input } from '@angular/core';
import { LoggingService } from '../logging.service';
import { CommentsService } from '../comments.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})


export class CommentSectionComponent implements OnInit {

  @Input() movieId;
  constructor(private loggingService: LoggingService, private http: HttpClient, private commentsService: CommentsService) { }
  sessionOn = false;
  serverResponse;
  currentUserId = this.loggingService.session.userId;
  currentUserName = this.loggingService.session.userName;
  commentForm: FormGroup;
  comments = [];


  ngOnInit() {
    if (this.loggingService.session.userId !== null) {
      this.sessionOn = true;
      console.log(this.sessionOn);
    }
    this.commentsService.getComments(this.movieId);
    // this.comments = this.commentsService.comments;
    this.commentsService.sentComments
      .subscribe((comments) => {
        this.comments = comments;
      });

    this.commentForm = new FormGroup({
      'content': new FormControl(null)
    });
  }

  onSubmit() {
    this.commentsService.addComment(this.movieId, this.currentUserId, this.currentUserName, this.commentForm.value.content);
  }


}
