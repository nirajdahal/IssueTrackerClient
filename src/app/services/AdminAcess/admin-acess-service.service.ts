import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IssueTrackerConfiguration } from 'src/app/IssueTrackerConfig';
import { CreateRoles, UserDetails, UserRoleForModification, UserRoles } from 'src/app/models/User';


@Injectable({
  providedIn: 'root'
})
export class AdminAcessServiceService {


  readonly BaseURI = IssueTrackerConfiguration.urlValue + '/api';
  httpHeader = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }
  getUserDetails() {
    return this.http.get<UserDetails[]>(this.BaseURI + '/adminaccess/users', this.httpHeader);
  }
  getAllRoles() {
    return this.http.get<UserRoles[]>(this.BaseURI + '/adminaccess/roles', this.httpHeader);
  }

  updateUserRole(data: UserRoleForModification) {
    var payload = data;
    return this.http.post<UserRoleForModification>(this.BaseURI + '/adminaccess/userrole', payload, this.httpHeader);
  }

  createRoles(data:CreateRoles){
    var payload = data;
    return this.http.post<CreateRoles>(this.BaseURI + '/adminaccess/createrole', payload, this.httpHeader);
  }



}
