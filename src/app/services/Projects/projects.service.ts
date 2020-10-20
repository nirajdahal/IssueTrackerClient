import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProjectIdNameVm } from 'src/app/models/Projects/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  readonly BaseURI = 'https://localhost:44392/api';
  httpHeader = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };

  postTicket: ProjectIdNameVm ;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }
  getProjectIdName() {
    return this.http.get<ProjectIdNameVm[]>(this.BaseURI + '/project/idname', this.httpHeader);
  }
}
