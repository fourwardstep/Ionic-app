import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';



@Component({
  selector: 'app-failed',
  templateUrl: './failed.page.html',
  styleUrls: ['./failed.page.scss'],
})
export class FailedPage implements OnInit {

  failedJobs:Array<any>=[];
  constructor(private service : JobService) { }

  ngOnInit() {
    this.service.getFailedJobList();
  }

  ionViewWillEnter(){
    this.service.getFailedJobList();
  }

}
