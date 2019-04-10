import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  
  constructor(private router : Router ,private service : AuthenticationService , private toaster : ToastController) { }

  ngOnInit() {
    
  }

  onSubmit(){
    this.service.updateUser(this.service.updatedUser.value).subscribe((res:any)=>{
      if(res.success){
        this.presentToast();
        this.router.navigate(['/edit-info']);
        this.resetForm();
      }else{
        this.presentToast1();
        this.router.navigate(['/edit-info']);
        this.resetForm();
      }
    },(err:any)=>console.log(err));
  }

  async presentToast() {
    const toast = await this.toaster.create({
      message: 'UserData updated successfully.',
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }

  async presentToast1() {
    const toast = await this.toaster.create({
      message: 'Sorry... Unable to Update',
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }

  resetForm(){
    this.service.updatedUser.setValue({
      _id : '',
      name : '',
      email : '',
      username : '',
      phone : '',
      title : '',
      company : '',
      location : '',
      education : ''
    })
  }
}
