import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  something;

  constructor(private loggingService: LoggingService) { }

  ngOnInit() {

      this.loggingService.sendSessionInfo
        .subscribe((session) => {
          this.something = session.userName;
          console.log(this.loggingService.session.userName);
        });

      // if (!this.loggingService.session.loggedIn) {
      //   this.loggingService.getSession();
      // }
      this.loggingService.getSession();



  }

}
