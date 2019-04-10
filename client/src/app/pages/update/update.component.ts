import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {

  user : FormGroup;
  constructor(private service : AuthenticationService , private toaster : ToastController) { }

  ngOnInit() {
    this.user = new FormGroup({
      _id : new FormControl(''),
      name : new FormControl('',Validators.required),
      email : new FormControl('',[Validators.required,Validators.email]),
      username : new FormControl('',Validators.required),
      phone : new FormControl('',Validators.required),
      title : new FormControl('',Validators.required),
      company : new FormControl('',Validators.required),
      location : new FormControl('',Validators.required),
      education : new FormControl('',Validators.required)
    });
  }

  onSubmit(){
    this.service.updateUser(this.user.value).subscribe((res:any)=>{
      if(res.success){
        this.presentToast();
      }else{
        this.presentToast1();
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

}
