import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';




@Component({
  selector: 'app-applied',
  templateUrl: './applied.page.html',
  styleUrls: ['./applied.page.scss'],
})
export class AppliedPage implements OnInit {



  constructor(private service: JobService) {
    this.service.getAppliedJobList();
  }


  ngOnInit() {
    this.service.getAppliedJobList();
  }

  ionViewWillEnter() {
    this.service.getAppliedJobList();
  }





}
