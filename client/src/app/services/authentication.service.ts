import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl : String = "http://192.168.0.100:3000/api";
    authToken:any;
    user:any;

  constructor(private http : HttpClient) { }

  postUser(user){
    let headers  = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}/register`,user,{headers : headers});
  }

  authenticate(usercred){
    let headers  = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}/login`,usercred,{headers : headers});
  }

  postFbData(fbuser){
    let headers  = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}/fblogin`,fbuser,{headers : headers});
  }

  postLinkedinData(linkedinuser){
    let headers  = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}/linkedinlogin`,linkedinuser,{headers : headers});
  }

  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }


}
