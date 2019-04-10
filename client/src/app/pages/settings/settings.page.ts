import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  userId : String;
  constructor(private router : Router, private service : AuthenticationService , private toaster : ToastController) { }

  ngOnInit() {
   this.userId = this.service.userData['0']['_id'];
  }

  gototermspage(){
    this.router.navigate(['/termsconditions']);
  }

  gotoPolicyPage(){
    this.router.navigate(['/privacypolicy']);
  }

  deleteAccount(){
    this.service.deleteUserData(this.userId).subscribe((res:any)=>{
      if(res.success){
        this.presentToast();
        this.router.navigate(['/home']);
      }else{
        this.presentToast1();
      }
    },(err:any)=>console.log(err));
  }

  logout(){
    this.service.logOut();
    this.router.navigate(['/home']);
  }

  async presentToast() {
    const toast = await this.toaster.create({
      message: 'User Deleted Successfully',
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }

  async presentToast1() {
    const toast = await this.toaster.create({
      message: 'Sorry.. Unable to delete user.',
      duration: 1000,
      position : 'top'
    });
    toast.present();
  }

}
