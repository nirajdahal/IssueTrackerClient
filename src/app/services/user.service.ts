import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginUser, RegisterUser } from '../models/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenVal } from '../models/TokenModel';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly BaseURI = 'https://localhost:44392/api';
  registerUser: RegisterUser;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }
  register(data: RegisterUser) {
    return this.http.post(this.BaseURI + '/user/register', data);
  }
  login(data: LoginUser) {
    var res = this.http.post(this.BaseURI + '/user/login', data);
    return res;
  }
  getUserData() {
    var res = this.http.get(this.BaseURI + '/profile');
    return res;
  }
  tokenVal: TokenVal;
  userRole(){
    var token = localStorage.getItem("issueTrackerToken")
    if (token !== null) {
      this.tokenVal = this.jwtHelper.decodeToken(token);
      var role = this.tokenVal.role;
      return role;
    }
  }

  accessMainComponent(){
    var usersRoles = ["Admin","Submitter", "Developer", "ProjectManager"];
    if(!usersRoles.includes(this.userRole())){
      localStorage.removeItem('issueTrackerToken');
      return true;
    }
  }
}
