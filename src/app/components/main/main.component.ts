import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as $ from "jquery";
import { ToastrService } from 'ngx-toastr';
import { TokenVal } from 'src/app/models/TokenModel';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],

})
export class MainComponent implements OnInit {
  constructor(private jwtHelper: JwtHelperService, private toastr: ToastrService, private router: Router, private userService: UserService,) { }
  tokenVal: TokenVal;
  userRole: string = "";
  ngOnInit(): void {
    var token = localStorage.getItem("issueTrackerToken")
    this.userRole = this.userService.userRole();
    if(this.userService.accessMainComponent()){
      this.router.navigate(['/user/registration']);
      this.toastr.warning("Admin permission required", 'Failed');
    }

    this.getUser();
    //Sidebar collapse on and off
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
      });
    });
  }

  logout() {
    localStorage.removeItem('issueTrackerToken');
    this.toastr.success("Logout Successful", 'Goodbye');
    this.router.navigate(['/user/registration']);
  }

  userName:String;
  getUser(){
    var token = localStorage.getItem("issueTrackerToken")
    if (token !== null) {
      this.tokenVal = this.jwtHelper.decodeToken(token);
      var name= this.tokenVal.UserName;
      this.userName = name

    }
  }
}
