import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  baseUrl : String = "http://192.168.0.100:3000/api";
  userId :String;
  appliedJobs:Array<any>=[];
  failedJobs:Array<any>=[];
  savedJobs:Array<any>=[];
  companies:Array<any>=[];

  constructor(private http : HttpClient ) {
   
   }

  getJobsDetails(){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    return this.http.get(`${this.baseUrl}/jobdetails`,{headers : headers});
  }


    // get the date and time
    dateAndTime() {
      return new Promise((resolve) => {  
        let date = new Date();
        let month = date.getMonth() + 1;
        let moment = date.getDate()+ '-'+ month + '-'+ date.getFullYear()+'-'+ date.getHours()+'-'+ date.getMinutes();
        console.log(moment);
        resolve(moment)
      });
    }

  // post the applied jobs 
  async postAppliedJob(jobItem) {
    let AppliedDate = await this.dateAndTime();
    let job = {
      companyTitle: jobItem.company,
      jobTitle: jobItem.jobtitle,
      location: jobItem.location,
      date: AppliedDate,
    }
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    this.http.post(`${this.baseUrl}/appliedJob`,job,{headers: headers})
    .subscribe((data: any) => {
      if(data) {
        console.log(job);
      }
    },(err: any) => {
      console.log('err in applying the job ' + err);
    });
  }

  //post the failed job
  async postFailedJob(jobItem) {
    let AppliedDate = await this.dateAndTime();
    let job = {
      companyTitle: jobItem.company,
      jobTitle: jobItem.jobtitle,
      location: jobItem.location,
      date: AppliedDate,
    }
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    this.http.post(`${this.baseUrl}/failedJob`,job,{headers: headers}).subscribe((data: any) => {
      if(data) {
        console.log('posted the disliked job');
      }
    },(err: any) => console.log(err + 'at the posting the failed jobs'));
  }

  // post the saved job
  async postSavedJob(jobItem) {
    let AppliedDate = await this.dateAndTime();
    let job = {
      companyTitle: jobItem.company,
      jobTitle: jobItem.jobtitle,
      location: jobItem.location,
      date: AppliedDate,
    }
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    this.http.post(`${this.baseUrl}/savedJob`,job,{headers: headers}).subscribe((data: any) => {
      if(data) {
        console.log('posted the saved job');
      }
    },(err: any) => console.log(err + 'at the posting the saved jobs'));
  }

  // get the applied jobs list 
  getAppliedJobList() {
    //let userId = await this.profileId();
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    return this.http.get(`${this.baseUrl}/appliedJob`,{headers: headers}).toPromise().then((jobs:any)=>{
      this.appliedJobs = jobs.slice().reverse();
      this.iteatr();
    },(err:any)=>console.log(err));
  }
  iteatr(){
    let b = [];
  this.appliedJobs.forEach(function(v,i,a){
    if(b.indexOf(a[i].companyTitle)=== -1){
      b.push(a[i].companyTitle);
    }
  });
    // console.log(b);
    this.companies = b;
    // console.log(this.companies[0]);
  }
  // get the failed job list
  getFailedJobList() {
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    return this.http.get(`${this.baseUrl}/failedJob`,{headers: headers}).toPromise().then((jobs:any)=>{
      this.failedJobs = jobs.slice().reverse();
    },(err:any)=>console.log(err));
  }
  
  // get the saved job list
  getSavedJobList() {
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    return this.http.get(`${this.baseUrl}/savedJob`,{headers: headers}).toPromise().then((jobs:any)=>{
      this.savedJobs = jobs.slice().reverse();
    },(err:any)=>console.log(err));
    
  }

}


