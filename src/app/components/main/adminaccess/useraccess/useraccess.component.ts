import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { cwd } from 'process';
import { UserDetails, UserRoleForModification, UserRoles } from 'src/app/models/User';
import { AdminAcessServiceService } from 'src/app/services/AdminAcess/admin-acess-service.service';

@Component({
  selector: 'app-useraccess',
  templateUrl: './useraccess.component.html',
  styleUrls: ['./useraccess.component.css']
})
export class UseraccessComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminAcessServiceService, private toastr: ToastrService) { }

  userRoles: UserRoles[] = [];
  userDetails: UserDetails[] = [];

  ngOnInit(): void {

    this.adminService.getAllRoles().subscribe(res =>
      this.userRoles = res
    );
    this.adminService.getUserDetails().subscribe(res => {
      this.userDetails = res
    })


  }

  selectedUser: string = "";
  selectedRole: string = "";

  onUserChange(val) {
    this.selectedUser = val;

  }
  onRoleChange(e) {
   this.selectedRole = e;
  }
  submitUserRole() {
    let userRoleForModification = new UserRoleForModification;
    userRoleForModification.UserId = this.selectedUser;
    userRoleForModification.Role = this.selectedRole;

    this.adminService.updateUserRole(userRoleForModification).subscribe(res => {

      this.router.navigateByUrl("/home/admin/useraccess");
      this.toastr.success("Role for User has been updated successfully");
    }
    ),(err) => {
      if (err.status == 400) {
        this.toastr.warning("Sorry the data to create is not valid", 'Failed!');
      }
      if (err.status == 401) {
        this.toastr.warning("Admin hasnot verified your account. Create Failed", 'Unauthorized!');
      }
      else {
        this.toastr.error("Create Failed ", 'Sorry!');
      }
    };

  }

}
