import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PostTicket } from 'src/app/models/Tickets/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  readonly BaseURI = 'https://localhost:44392/api';
  httpHeader = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };

  postTicket: PostTicket;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }
  createTicket(data: PostTicket) {
    return this.http.post(this.BaseURI + '/ticket', data, this.httpHeader);
  }
}
