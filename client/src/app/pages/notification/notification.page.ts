import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toPolicypage() {
    this.router.navigate(['/privacypolicy']);
  }

  acccessNofification() {
    this.router.navigate(['/privacypolicy']);
  }
  notnow(){
    this.router.navigate(['/edit-info'])
  }

}
