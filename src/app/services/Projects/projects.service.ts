import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProjectDto, ProjectForUpdateDto, ProjectIdNameVm } from 'src/app/models/Projects/Project';

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

  getAllProjects() {
    return this.http.get<ProjectDto[]>(this.BaseURI + '/project', this.httpHeader);
  }

  deleteProject(id: String) {
    return this.http.delete(this.BaseURI + '/project/' + id, this.httpHeader);
  }

  updateProject(id:string,data:ProjectForUpdateDto ){
    var payload = data;
    return this.http.put<ProjectForUpdateDto>(this.BaseURI + '/project/' + id, payload ,this.httpHeader);
  }
}
