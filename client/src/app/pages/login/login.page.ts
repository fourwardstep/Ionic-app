import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { NgZone } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  readUsernames: boolean = false;
  readPswd: boolean = false;
  _timeout: any = null;
  usercred: FormGroup;
  name1: any = '';
  name2: any = '';
  constructor(private router: Router, private service: AuthenticationService,private loader : LoadingController,
    private lc: NgZone, public toaster: ToastController, public alertCtrl: AlertController) { }

  ngOnInit() {
    this.usercred = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(10)])
    })
  }

  readUserName() {
    this._timeout = null;
    if (this._timeout) { //if there is already a timeout in process cancel it
      window.clearTimeout(this._timeout);
    }
    this.readUsernames = true;
    this._timeout = window.setTimeout(() => {
      this._timeout = null;
      this.lc.run(() => this.name1 = this.usercred.controls.username);
      this.readUsernames = false;
    }, 2000);
  }
  readPassword() {
    this._timeout = null;
    if (this._timeout) { //if there is already a timeout in process cancel it
      window.clearTimeout(this._timeout);
    }
    this.readPswd = true;
    this._timeout = window.setTimeout(() => {
      this._timeout = null;
      this.lc.run(() => this.name2 = this.usercred.controls.password);
      this.readPswd = false;
    }, 2000);
  }

  onSubmit() {
    this.service.authenticateUser(this.usercred.value).subscribe((res: any) => {
      if (res.success) {
        this.service.storeUserData(res.token, res.user);
        this.presentToast();
        setTimeout(() => {
          this.router.navigate(['/location']);
        }, 1000);
        this.resetForm();
      }
      else {
        this.presentToast1();
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
        this.resetForm();
      }
    }, (err: any) => {
      console.log(err);
    })

  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }


  goback() {
    this.router.navigate(['/home']);
  }

  resetForm() {
    this.usercred.setValue({
      username: '',
      password: ''
    })
  }

  async presentToast() {
    const toast = await this.toaster.create({
      message: 'Authentication Successfull.',
      duration: 1000,
      position: 'top',
      color : "primary"
    });
    toast.present();
  }

  async presentToast1() {
    const toast = await this.toaster.create({
      message: 'Sorry.. User doesnot exist.',
      duration: 1000,
      position: 'top',
      color : 'danger'
    });
    toast.present();
  }

}
