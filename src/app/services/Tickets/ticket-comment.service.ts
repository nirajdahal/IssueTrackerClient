import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IssueTrackerConfiguration } from 'src/app/IssueTrackerConfig';
import { TicketCommentVmDto } from 'src/app/models/Tickets/Comment';

@Injectable({
  providedIn: 'root'
})
export class TicketCommentService {

  readonly BaseURI = IssueTrackerConfiguration.urlValue + '/api';;
  httpHeader = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }
  createTicket(data: TicketCommentVmDto) {
    return this.http.post(this.BaseURI + '/comments', data, this.httpHeader);
  }

  getTicketComment(id) {
    return this.http.get<TicketCommentVmDto[]>(this.BaseURI + '/comments/'+id, this.httpHeader);
  }
}
