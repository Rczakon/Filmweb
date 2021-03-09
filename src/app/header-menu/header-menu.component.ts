import { Component, OnInit } from '@angular/core';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {

  isLogged = false;
  currentUser = '';
  currentUserId;

  constructor(public loggingService: LoggingService) { }

  ngOnInit() {
    // console.log(this.isLogged);
    // this.loggingService.sendSessionInfo
    // .subscribe((session: any) => {
    //   this.isLogged = session.isLogged;
    //   this.currentUserId = session.userId;
    // });
  }

  logOut() {
    console.log('Wylogowywanie...');
    this.loggingService.logOut();
  }

  showMessage() {
    console.log(this.currentUserId);

  }
}
