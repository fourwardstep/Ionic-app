import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import {
  StackConfig,
  DragEvent,
  SwingStackDirective,
  SwingCardDirective,
} from 'ionic-swing';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { JobService } from '../services/job.service';
import 'hammerjs';
import Card from 'ionic-swing/src/app/modules/ionic-swing/swing/card';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.page.html',
  styleUrls: ['./feeds.page.scss'],
})
export class FeedsPage implements OnInit {

  @ViewChild('swingStack', { read: SwingStackDirective }) swingStack: SwingStackDirective;
  @ViewChildren('swingCards', { read: SwingCardDirective }) swingCards: QueryList<SwingCardDirective>;
  stackConfig: StackConfig;
  recentCard: string = '';
  cards: Array<any> = [];
  buttonColor: string = '#F2F0F4';
  likeSymbol: boolean = false;
  jobtitletosave: string;
  showdropdown: boolean = false;
  searchQuery: string = '';
  items: string[];
  jobDetails: Array<any> = [];

  constructor(private router: Router, private nativePageTransitions: NativePageTransitions,
    private jobservice: JobService, private modalController: ModalController, private localNotifications: LocalNotifications, ) {
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth / 2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: () => {
        return 800;
      }
    };
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
    });
    return await modal.present();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });

    this.jobservice.getJobsDetails().subscribe((data: any) => {
      this.jobDetails = data;
      this.addNewCards();
    }, (err: any) => { console.log('err in getting job des ' + err) });
  }



  // Called whenever we drag an element
  onItemMove(element, x, y, r) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    let hexCode = this.decimalToHex(min, 2);

    if (x < 0) {
      color = '#FF' + hexCode + hexCode;
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
    }

    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }



  decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return hex;
  }

  //like symbol
  tapEvent() {
    this.likeSymbol = true;
    if (this.likeSymbol) {
      this.buttonColor = '#E24B4B';
    }
    else {
      this.buttonColor = '#F2F0F4';
    }
  }

  // job roles to display in dropdown
  initializeItems() {
    this.items = [
      'java developer',
      '.Net developer',
      'python developer',
      'Full Stack developer',
      'UX/UI design',
      'MEAN stack developer',
      'hadoop',
      'Data scientist',
      'js developer'
    ];
  }

  // get job items
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      this.showdropdown = true;
    } else {
      this.showdropdown = false;
    }
  }
  launchjobDescriptionPage(card) {
    let options: NativeTransitionOptions = {
      direction: 'down',
      duration: 100,
      slowdownfactor: -1,
      iosdelay: 50,
      androiddelay: 50,
    }
    this.nativePageTransitions.fade(options);
    this.router.navigate(['/jobdetail', card]);
  }


  // swiping cards functionality 
  voteUp(like: boolean) {
    let removedCard = this.cards.pop();
    // when card is swiped right is is going to call the post the applied job method
    if (like) {
      console.log('you have liked ' + removedCard.jobtitle + ' ' + removedCard.company + ' ' + removedCard.location);

      this.jobservice.postAppliedJob(removedCard);
    }
    // when the card is swiped left it's going to call the post the failed job method. 
    else {
      console.log('you have disliked ' + removedCard.jobtitle + ' ' + removedCard.company + ' ' + removedCard.location);
      this.jobservice.postFailedJob(removedCard);
    }
  }

  // Add new cards to our array
  addNewCards() {
    for (let val of this.jobDetails) {
      this.cards.push(val);
    }
  }

}
