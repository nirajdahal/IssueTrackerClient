import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChangePassword } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  constructor(private userService: UserService, private toastr: ToastrService) { }
  changePassword: ChangePassword;
  ngOnInit(): void {
  }
  confirmPassword: string = "";
  oldPassword: string = "";
  newPassword: string = "";
  passwordMatch: boolean = false;
  passwordLength: boolean = false;
  comparePasswords() {
    if (this.newPassword === this.confirmPassword && this.newPassword.length != 0) {
      this.passwordMatch = true;
    }
    else {
      this.passwordMatch = false;
      this.passwordLength = false;
    }
    if (this.newPassword.length > 6 && this.confirmPassword.length > 6) {
      this.passwordLength = true;
    }
    else {
      this.passwordLength = false;
    }
  }
  changeThePassword() {
    this.changePassword = {
      OldPassword: this.oldPassword,
      NewPassword: this.newPassword
    }
    this.userService.changePassword(this.changePassword).subscribe(data => {
      this.toastr.success("Password Chnaged Successfully", 'Success!');
      this.confirmPassword = "";
      this.oldPassword = "";
      this.newPassword = "";
    },
      (err) => {
        if (err.status == 400) {
          this.toastr.warning("Sorry the update data is not valid", 'Failed!');
        }
        if (err.status == 401) {
          this.toastr.warning("Admin hasnot verified your account. Update Fail", 'Unauthorized!');
        }
        else {
          this.toastr.error("Change Password Failed", 'Sorry!');
        }
      })
  }
}
