import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-termsconditions',
  templateUrl: './termsconditions.page.html',
  styleUrls: ['./termsconditions.page.scss'],
})
export class TermsconditionsPage implements OnInit {

  constructor(private nav : NavController) { }

  ngOnInit() {
  }

  goback(){
    this.nav.back();
  }

}
