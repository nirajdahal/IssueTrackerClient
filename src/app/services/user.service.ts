import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ChangePassword, LoginUser, RegisterUser, UserVm } from '../models/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenVal } from '../models/TokenModel';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly BaseURI = 'https://localhost:44392/api';
  httpHeader = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };
  registerUser: RegisterUser;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }
  register(data: RegisterUser) {
    return this.http.post(this.BaseURI + '/user/register', data, this.httpHeader);
  }
  login(data: LoginUser) {
    var res = this.http.post(this.BaseURI + '/user/login', data, this.httpHeader);
    return res;
  }
  getUserData() {
    var res = this.http.get(this.BaseURI + '/profile', this.httpHeader);
    return res;
  }
  tokenVal: TokenVal;
  userRole() {
    var token = localStorage.getItem("issueTrackerToken")
    if (token !== null) {
      this.tokenVal = this.jwtHelper.decodeToken(token);
      var role = this.tokenVal.role;
      return role;
    }
  }
  accessMainComponent() {
    var usersRoles = ["Admin", "Submitter", "Developer", "Project Manager"];
    if (!usersRoles.includes(this.userRole())) {
      localStorage.removeItem('issueTrackerToken');
      return true;
    }
  }
  getAllDevelopers() {
    var res = this.http.get<UserVm[]>(this.BaseURI + '/user/developers', this.httpHeader);
    return res;
  }
  getProjectManagers() {
    var res = this.http.get<UserVm[]>(this.BaseURI + '/user/pmanagers', this.httpHeader);
    return res;
  }

  changePassword(data: ChangePassword){
    var res = this.http.post<ChangePassword>(this.BaseURI + '/profile', data, this.httpHeader);
    return res;
  }

}
