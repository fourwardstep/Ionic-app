import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {

 
  searchbar: boolean = true;
  constructor(private service : JobService) { }

  ngOnInit() {
    this.service.getAppliedJobList();
  }

  ionViewWillEnter(){
    this.service.getAppliedJobList();
  }

  opensearchbar() {
    this.searchbar = false;
  }
  

}
