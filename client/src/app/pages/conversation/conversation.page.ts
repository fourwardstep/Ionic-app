import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

  appliedJobs:any;

  constructor(private router : Router, private service : JobService) { 
   
  }

  ngOnInit() {
  this.service.getAppliedJobList();
   
  }
  
  ionViewWillEnter(){
    this.service.getAppliedJobList();
  }


  gotoChatbox(){
    this.router.navigate(['/chatbox']);
  }

}
