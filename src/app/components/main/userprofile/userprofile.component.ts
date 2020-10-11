import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  name = "abc";
  email="abc";
  userInfo;
  valueExtracted: boolean = false;
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    if(localStorage.getItem("token")!==null){
      this.userService.getUserData().subscribe(data=> {
        this.valueExtracted = true;
        this.userInfo = data;
      })
    }

  }
}
