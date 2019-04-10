import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { JobService } from '../services/job.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-jobdetail',
  templateUrl: './jobdetail.page.html',
  styleUrls: ['./jobdetail.page.scss'],
})
export class JobdetailPage implements OnInit {

  company : string;
  jobtitle : string;
  location : string;
  jobtype : string;
  jobdescription : string;
  date : any;

  constructor(private router : Router, private route : ActivatedRoute,private nativePageTransitions: NativePageTransitions,
    private service : JobService , private actionSheetController : ActionSheetController) { }

  ngOnInit() {
    this.company = this.route.snapshot.paramMap.get('company');
    this.jobtitle = this.route.snapshot.paramMap.get('jobtitle');
    this.location = this.route.snapshot.paramMap.get('location');
    this.jobtype = this.route.snapshot.paramMap.get('jobtype');
    this.jobdescription = this.route.snapshot.paramMap.get('jobdescription');
    this.date = this.service.dateAndTime();
  }

  minimizePage() {
    let options: NativeTransitionOptions = {
      direction: 'down',
      duration: 100,
      slowdownfactor: -1,
      iosdelay: 50,
      androiddelay: 50,
    }
    this.nativePageTransitions.slide(options);
    this.router.navigate(['/jobs/feeds']);
  }

  async moreOptions(){
    {
      const actionSheet = await this.actionSheetController.create({
        header: 'Albums',
        buttons: [{
          text: 'Save',
          role: 'destructive',
          icon: 'save',
          handler: () => {
            this.savethejob();
          }
        }, {
          text: 'Share',
          icon: 'share',
          handler: () => {
            console.log('Share clicked');
          }
        }, {
          text: 'Play (open modal)',
          icon: 'arrow-dropright-circle',
          handler: () => {
            console.log('Play clicked');
          }
        }, {
          text: 'Favorite',
          icon: 'heart',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
    }

  }

  savethejob(){
    let jobitem = {
      company : this.company,
      jobtitle : this.jobtitle,
      location : this.location,
      date  : this.date
    }
   this.service.postSavedJob(jobitem); 
  }

  applyjob() {
    let jobitem = {
      company : this.company,
      jobtitle : this.jobtitle,
      location : this.location,
      date  : this.date
    }
   this.service.postAppliedJob(jobitem);
  }

  cancelbtn() {
    this.router.navigate(['/jobs/feeds']);
  }

}
