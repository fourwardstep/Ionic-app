import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl : String = "http://192.168.0.100:3000/api";
  // baseUrl : String = 'http://10.0.2.2:3000/api';
  user : any;
  userData : User;
  authToken : any;
  linkedinOauthUrl : string = "https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,picture-url)?format=json&oauth2_access_token=";
  updatedUser : FormGroup;
  user_id : string;

  constructor(private http:HttpClient) { 
    this.updatedUser = new FormGroup({
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
  ngOnInit() {
    
    
  }

  postUser(user){
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });
    return this.http.post(`${this.baseUrl}/register`,user,{headers : headers});
  }

  getUserData(){
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.get(`${this.baseUrl}/user`, {headers : headers}).toPromise().then((res:User)=>{
      this.userData = res;
    },(err:any)=>console.log(err));
  }
  getUserWithId(id){
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.get(`${this.baseUrl}/user/${id}`,{headers : headers});
  }

  getProfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get(`${this.baseUrl}/profile`,{headers: headers});
  }

  updateUser(user){
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.put(`${this.baseUrl}/update/${user._id}`,user,{headers : headers});
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  deleteUserData(id){
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.delete(`${this.baseUrl}/delete/${id}`,{headers : headers});
  }

  authenticateUser(usercred){
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });
    return this.http.post(`${this.baseUrl}/login`,usercred,{headers : headers});
  }

  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

   // to update the user profile
   updateProfile(user_id,userProfiledata) {
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });
    return this.http.put('http://192.168.0.100:3000/api/profile/'+ user_id, userProfiledata,{headers: headers});
  }

  logOut(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  postfbData(fbdata){
    let headers = new HttpHeaders({
      'Content-type':'application/json'
    });
    return this.http.post(`${this.baseUrl}/fblogin`,fbdata,{headers : headers})
  }

  forgotPassword(email){
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.post(`${this.baseUrl}/forgot`,email,{headers : headers});
  }

  resetPassword(data){
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.http.put(`${this.baseUrl}/reset/`+data.token,data,{headers : headers});
  }

 // to get the api response(profile data) from linkedin
 gettheLinkedinUserDetails(token: any): Observable<any> {
  alert(token);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Authorization','Bearer '+token);
  return this.http.get(this.linkedinOauthUrl + '' + token,{headers: headers})
  
}

// sending linkedin profile data to database
postLinkedinData(profileData) {
  let headers = new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.post(`${this.baseUrl}/linkedin`,profileData,{headers: headers})
  
}

 // send and receive the messages from the dialogflow
 dialogflow(queryData) {
  let headers = new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.post(`${this.baseUrl}/dialogflow`,queryData,{headers: headers})

}

}
