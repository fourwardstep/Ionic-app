import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user_id:String;
  about: string;
  education: string;
  expirence: string;
  unlock: boolean = false;
  lock: boolean = true;
  resume: any;
  profilePic: any;
  userSpecificData: any = { resume:'', about: '',education:'', expirence:'', profilePic: ''}
  resumeName: any;

  constructor(private camera: Camera, private file: File, private fileChooser: FileChooser,private router : Router,
  private service : AuthenticationService) { }

  ngOnInit() {
   this.user_id = this.service.userData['0']['_id'];
    if( this.resume == '' ){
      this.resume = 'upload resume';
    }
    if(this.profilePic == null) {
      this.profilePic = "assets/imgs/pp.jpeg";
     }
  }

  
  editContent() {
    this.lock = false;
    this.unlock = true;
  }

  profileSubmit(profile:NgForm) {
    
  
    this.service.updateProfile(this.user_id,profile.value).subscribe((data: any) => {
      //this.userSpecificData = data;
      console.log(data);
      this.about = data.about;
      this.education = data.education;
      this.expirence = data.expirence;
      this.profilePic = data.profilePic
      if(!data.resume) {
        this.resumeName = 'Upload Resume';
      } else {
        this.resume = data.resume;
      } 
    });
    console.log(profile.value)
    
    this.unlock = false;
    this.lock = true;
  }

  

  uploadFile() {
    this.fileChooser.open().then((uri) => {
       console.log(uri);

       this.file.resolveLocalFilesystemUrl(uri).then((newURL) => {
         console.log(JSON.stringify(newURL));

         let dirPath = newURL.nativeURL;
         let dirPathSegments = dirPath.split('/');   // break string into array
         this.resumeName = dirPathSegments.pop() // removes the file name
         dirPath = dirPathSegments.join('/')
 
         this.file.readAsArrayBuffer(dirPath, newURL.name).then(async (buffer) => {
          await this.upload(buffer,newURL.name)
         })
       })
    }) 
  }

  async upload(buffer, name) {
    this.resume = new this.resume([buffer],{ type:"pdf" });
    this.resume = this.resume;
  }

// to access gallery
  openGaller() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
     }).then((imageData) => {
       this.profilePic = 'data:image/jpeg;base64,'+imageData;
      }, (err) => {
       console.log(err);
     });
  }


}
