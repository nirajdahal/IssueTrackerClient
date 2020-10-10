import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  userName:string="";
  userEmail:string="";
  userInfo: Object = {
    name:"",
    email:""
  };
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.getUserData().subscribe(data=> {
      this.userInfo = data;
    })
  }
}
