import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user:FormGroup;
  constructor(private router:Router, private service : AuthenticationService,public toaster : ToastController) { }

  ngOnInit() {
    this.user = new FormGroup({
      name : new FormControl('',Validators.required),
      email : new FormControl('',[Validators.required,Validators.email]),
      username : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required,Validators.maxLength(6),Validators.maxLength(10)]),
      phone : new FormControl(''),
      title : new FormControl(''),
      company : new FormControl(''),
      location : new FormControl(''),
      education : new FormControl('')
    })
  }

  onSubmit(){
    this.service.postUser(this.user.value).subscribe((res:any)=>{
      if(res.success){
        this.presentToast();
          this.router.navigate(['/login']);
        this.resetForm();
      }
      else{
        this.presentToast1();
          this.router.navigate(['/home']);
        this.resetForm();
      }
    },(err:any)=>{
      console.log(err);
      this.presentToast1();
      this.router.navigate(['/home']);
    });
    
  }

  goback(){
    this.router.navigate(['/home']);
  }

  resetForm(){
    this.user.setValue({
      name : '',
      email : '',
      username : '',
      password: '',
      phone : '',
      title : '',
      company : '',
      location : '',
      education : ''
    })
  }

  async presentToast() {
    const toast = await this.toaster.create({
      message: 'User Registered Successfully.',
      duration: 1000,
      position : 'top',
      color : 'secondary'
    });
    toast.present();
  }

  async presentToast1() {
    const toast = await this.toaster.create({
      message: 'Duplicate credentials... ',
      duration: 1000,
      position : 'top',
      color : "danger"
    });
    toast.present();
  }

  termspage(){
    this.router.navigate(['/termsconditions']);
  }

  privacypage(){
    this.router.navigate(['/privacypolicy']);
  }

}
