import { Component } from '@angular/core';
import { ToastController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  clientId = '81o5adcju2ish4';
  clientSecret = 'psZvCvVd23O4PRBP';
  redirect_uri = "http://10.0.2.2:5584/location";
  state = 'hjfdhjGj12j';
  appScope = 'r_basicprofile%20r_emailaddress';
  linkedinURL: any;
  accessToken: any;
  result: any;
  code: any;

  constructor(private router:Router, private iab: InAppBrowser, private fb:Facebook, private service : AuthenticationService,public toaster : ToastController, private platform: Platform, private http : HttpClient){
    this.linkedinURL = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id='+this.clientId+'&redirect_uri='+this.redirect_uri+'&state='+this.state+'&scope='+this.appScope;
  }


    //Login with Facebook

    loginWithFb(){
      this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {
      this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)',[]).then((profile)=>{
        let fbdata = {fb_Id : profile['id'],name : profile['first_name'],email : profile['email'],username : profile['name']}
        this.service.postfbData(fbdata).subscribe((res:any)=>{
          if(res.success){
            this.service.storeUserData(res.token,res.user);
            this.presentToast();
            setTimeout(() => {
              this.router.navigate(['/location']);
            }, 1000);
          }
          else{
            this.presentToast1();
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 1000);
          }
        })
      })
    })
    .catch(e => console.log('Error logging into Facebook', JSON.stringify(e,undefined,2)));
    }
  

  // to redirect to the linkedin OAuth login page -------------------------------------

  linkPage(): Promise<any> {
    return new Promise((resolve,reject) => {
      let browser = this.iab.create(this.linkedinURL,'_blank');
      let listner = browser.on('loadstart').subscribe((event: any) => {
        if(event.url.indexOf('oauth/v2/authorization') > -1){
          return;
        }
        if(event.url.indexOf(this.redirect_uri) > -1 ) {
          listner.unsubscribe();
          browser.close();
          var token = event.url.split('=')[1].split('&')[0];
          this.code = token;
          //alert(this.code);
          resolve(this.code);
        }
        else {
          reject('could not authenticate');
        }
      });
    });
  }

  // on clicking the sign-in with linkedin button
  
  linkedinLogin() {
    this.platform.ready().then(()=> {
      this.linkPage().then(success => {
        //alert(success);
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('https://www.linkedin.com/oauth/v2/accessToken?client_id='+this.clientId+'&client_secret='+this.clientSecret+'&grant_type=authorization_code&code='+success+'&redirect_uri='+this.redirect_uri,{headers: headers})
        //.toPromise()
        .subscribe((res: any) => {
          let result = res.access_token;
          //alert(result);
          if(result !== undefined) {
            console.log('received the token');
            this.service.gettheLinkedinUserDetails(result)
            .subscribe((res: any) => {
              let profileData = {
                name: res.firstName,
                username: res.firstName + ' '+res.lastName,
                linkedin_id: res.id,
                email: res.emailAddress,
                lkprofilePic: res.pictureUrl
              }
              alert(profileData.email);
              this.service.postLinkedinData(profileData)
              .subscribe((data: any) => {
                if (data.success) {
                  alert('Data added sucessfully ' && data.msg);
                  this.service.storeUserData(data.token,data.user);
                  this.router.navigate(['/location']);
                }
                else {
                  alert('data is not added');
                }
              }, (err) => {
                console.log('err in subscribe '+err);
              });
            },(err) => {
              alert('Error in getting the response ' +JSON.stringify(err));
            })
          }
          else {
            alert('did not received any token');
          }
        });
      });
    });
  }


  async presentToast() {
    const toast = await this.toaster.create({
      message: 'Authentication Successfull',
      duration: 1500,
      position : 'top'
    });
    toast.present();
  }

  async presentToast1() {
    const toast = await this.toaster.create({
      message: 'sorry Unable to add user data.',
      duration: 1500,
      position : 'top'
    });
    toast.present();
  }
  
  gotoSignup(){
    this.router.navigate(['/signup']);
  }

  gotoLogin(){
    this.router.navigate(['/login']);
  }

  termspage(){
    this.router.navigate(['/termsconditions']);
  }

  privacypage(){
    this.router.navigate(['/privacypolicy']);
  }

}
