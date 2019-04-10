import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  useremail :FormGroup;
  constructor(private router:Router,private service : AuthenticationService , public toaster : ToastController) { }

  ngOnInit() {
   this.useremail = new FormGroup({
     email : new FormControl('',[Validators.required,Validators.email])
   })
  }

  onSubmit(){
    console.log(this.useremail.value);
    this.service.forgotPassword(this.useremail.value).subscribe((res:any)=>{
      if(res.success){
        setTimeout(() => {
          this.presentToast2();
          this.router.navigate(['/login']);
        }, 1500);
        this.resetForm();
      }else{
        setTimeout(() => {
          this.presentToast3();
          this.router.navigate(['/home']);
        }, 1500);
        this.resetForm();
      }
    },(err:any)=>{
      console.log(err);
    })
  }

  goback(){
    this.router.navigate(['/login']);
  }
  resetForm(){
    this.useremail.setValue({
      email : '',
    })
  }

  async presentToast2() {
    const toast = await this.toaster.create({
      message: 'A reset password link sent successfully to your Email Id',
      duration: 1000,
      position : 'top'
    });
    toast.present();
  }

  async presentToast3() {
    const toast = await this.toaster.create({
      message: 'Sorry User doesnot exists',
      duration: 1000,
      position : 'top'
    });
    toast.present();
  } 

}
