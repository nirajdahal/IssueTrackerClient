import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUser, RegisterUser } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/home'])
    }
    //Animation for signin and sign up toggle
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");
    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });
    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  }
  // Sign Up Part //
  signUpUserName: string = "";
  signUpEmail: string = "";
  signUpPassword: string = "";
  registerModel: RegisterUser;
  validEmail: boolean = false;
  validPassword: boolean = false;
  signingUp: boolean = false;
  checkValidPassword() {
    // var onlyNumbers = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
    // var testnumber = onlyNumbers.test(String(this.signUpPassword));
    var check = (this.signUpPassword.length >= 6) ? true : false;
    return this.validPassword = check;
  }
  checkValidEmail() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var val = re.test(String(this.signUpEmail).toLowerCase());
    return this.validEmail = val;
  }
  signUp() {
    this.signingUp = true;
    this.registerModel = {
      Name: this.signUpUserName,
      Email: this.signUpEmail,
      Password: this.signUpPassword
    }
    this.userService.register(this.registerModel).subscribe(res => {
      if (res.toString().includes("Sucessfully")) {
        this.resetSignUpForm()
        this.toastr.success(res.toString(), 'Success');
      }
      else if (res.toString().includes("Sorry")) {
        this.signingUp = false;
        this.toastr.error(res.toString(), 'Failed');
      }
      else {
        this.signingUp = false;
        this.toastr.error('Registration Failed!', 'Sorry!!');
      }
    });
  }
  resetSignUpForm() {
    this.signingUp = false;
    this.signUpEmail = "";
    this.signUpPassword = "";
    this.signUpUserName = "";
    this.validEmail = false;
    this.validPassword = false;
  }
  //SignIn Part
  signInEmail: string = "";
  signInPassword: string = "";
  loginModel: LoginUser
  signIn() {
    this.loginModel = {
      Email: this.signInEmail,
      Password: this.signInPassword
    }
    this.userService.login(this.loginModel).subscribe((res: any) => {
      localStorage.setItem("token", res.token);
      this.toastr.success("Login Sucessful", 'Thank You!');
      this.router.navigateByUrl("/home");
    },
      (err) => {
        if (err.status == 400) {
          this.toastr.warning("Incorrect username or password", 'Failed!');
        }
        else {
          this.toastr.error("Login Failed", 'Sorry!');
        }
      })
  }
}
