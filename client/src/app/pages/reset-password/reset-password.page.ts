import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

   token : String;
  resetpassword:FormGroup;
  
  constructor(private router : Router, private route : ActivatedRoute, public toaster : ToastController, private service : AuthenticationService) { }

  ngOnInit() {
    this.resetpassword = new FormGroup({
      password : new FormControl('',[Validators.required]),
      confirm : new FormControl('',[Validators.required])
    });

    let token1 = this.route.snapshot.paramMap.get('token');
    console.log(token1);
    this.token = token1;
  }


  onSubmit(){
    
      if(this.resetpassword.controls.password.value === this.resetpassword.controls.confirm.value){
        let data = {
          password: this.resetpassword.controls.password.value,
          token: this.token
        }
        this.service.resetPassword(data)
        .subscribe((data: any)=> {
          if( data.success ) {
            this.presentToast2();
            this.resetForm();
            this.router.navigate(['/home']);
          }
        },(err:any)=>console.log(err));
      } else {
          this.presentToast3();
          this.resetForm();
        }
   }
  


  goback(){
    this.router.navigate(['/login']);
  }

  resetForm(){
    this.resetpassword.setValue({
      password : '',
      confirm : ''
    })
  }

  async presentToast2() {
    const toast = await this.toaster.create({
      message: 'password changed successfully',
      duration: 1000,
      position : 'top'
    });
    toast.present();
  }

  async presentToast3() {
    const toast = await this.toaster.create({
      message: 'entered passwords doesnot match please try again',
      duration: 2000,
      position : 'top'
    });
    toast.present();
  } 

}
