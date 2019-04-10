import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';


@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements OnInit {

  
  constructor(private service : JobService) { }

  ngOnInit() {
    this.service.getSavedJobList();
  }
  ionViewWillEnter(){
    this.service.getSavedJobList();
  }

}
