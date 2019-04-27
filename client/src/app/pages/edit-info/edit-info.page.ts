import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../model/user';



@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.page.html',
  styleUrls: ['./edit-info.page.scss'],
})
export class EditInfoPage implements OnInit {


  user_id: string;

  constructor(private router: Router, private service: AuthenticationService) {

  }

  ngOnInit() {
    this.service.getUserData();
  }
  ionViewWillEnter(){
    this.service.getUserData();
  }
  ngAfterViewInit() {
    
  }
  
  
  editUser(id) {
    this.user_id = id;
    this.service.getUserWithId(id).subscribe((user: User) => {
      this.populateForm(user);
      this.router.navigate(['/update']);
    }, (err: any) => console.log(err));

    
  }
  

  populateForm(user) {
    this.service.updatedUser.patchValue(user);
  }

  closeEditInfoPage() {
    this.router.navigate(['/slides']);
  }

  back() {
    this.router.navigate(['/notification']);
  }




}
