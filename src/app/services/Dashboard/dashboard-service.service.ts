import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IssueTrackerConfiguration } from 'src/app/IssueTrackerConfig';
import { UserDetails, UserRoles, UserRoleForModification, CreateRoles, UserRolesCount, ProjectTicket } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  readonly BaseURI = IssueTrackerConfiguration.urlValue + '/api';
  httpHeader = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  getUserRoles() {
    return this.http.get<UserRolesCount[]>(this.BaseURI + '/dashboard/userrole', this.httpHeader);
  }

  getProjectTicket() {
    return this.http.get<ProjectTicket>(this.BaseURI + '/dashboard/ticketproject', this.httpHeader);
  }

}
