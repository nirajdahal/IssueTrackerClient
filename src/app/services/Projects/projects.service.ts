import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IssueTrackerConfiguration } from 'src/app/IssueTrackerConfig';
import { ProjectVmDto, ProjectForCreation, ProjectForUpdateDto, ProjectIdNameVm } from 'src/app/models/Projects/Project';
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  readonly BaseURI = IssueTrackerConfiguration.urlValue + '/api';
  httpHeader = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };
  postTicket: ProjectIdNameVm;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }
  getProjectIdName() {
    return this.http.get<ProjectIdNameVm[]>(this.BaseURI + '/project/idname', this.httpHeader);
  }
  getAllProjects() {
    return this.http.get<ProjectVmDto[]>(this.BaseURI + '/project', this.httpHeader);
  }
  deleteProject(id: String) {
    return this.http.delete(this.BaseURI + '/project/' + id, this.httpHeader);
  }
  updateProject(id: string, data: ProjectForUpdateDto) {
    var payload = data;
    return this.http.put<ProjectForUpdateDto>(this.BaseURI + '/project/' + id, payload, this.httpHeader);
  }
  createProject(data: ProjectForCreation) {
    var payload = data;
    return this.http.post<ProjectForCreation>(this.BaseURI + '/project', payload, this.httpHeader);
  }

  getAllProjectsForUser(Id:string) {
    return this.http.get<ProjectVmDto[]>(this.BaseURI + '/userproject/' + Id, this.httpHeader);
  }
}
