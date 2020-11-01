import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TicketPriorityVmDto, TicketStatusVmDto, TicketTypeVmDto } from 'src/app/models/Tickets/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketSettingsService {

  readonly BaseURI = 'https://localhost:44392/api';
  httpHeader = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }


  createTicketPriority(data: TicketPriorityVmDto) {
    return this.http.post<TicketPriorityVmDto>(this.BaseURI + '/priority', data, this.httpHeader);
  }

  getTicketPriority() {
    return this.http.get<TicketPriorityVmDto[]>(this.BaseURI + '/priority', this.httpHeader);
  }

  deleteTicketPriority(Id: string) {
    return this.http.delete(this.BaseURI + '/priority/' + Id, this.httpHeader);
  }

  updateTicketPriority(Id: string, data: TicketPriorityVmDto) {
    return this.http.put(this.BaseURI + '/priority/' + Id, data, this.httpHeader);
  }


  createTicketStatus(data: TicketStatusVmDto) {
    return this.http.post<TicketStatusVmDto>(this.BaseURI + '/status', data, this.httpHeader);
  }

  getTicketStatus() {
    return this.http.get<TicketStatusVmDto[]>(this.BaseURI + '/status', this.httpHeader);
  }

  deleteTicketStatus(Id: string) {
    return this.http.delete(this.BaseURI + '/status/' + Id, this.httpHeader);
  }

  updateTicketStatus(Id: string, data: TicketStatusVmDto) {
    return this.http.put(this.BaseURI + '/status/' + Id, data, this.httpHeader);
  }


  createTicketType(data: TicketTypeVmDto) {
    return this.http.post<TicketStatusVmDto>(this.BaseURI + '/type', data, this.httpHeader);
  }

  getTicketType() {
    return this.http.get<TicketTypeVmDto[]>(this.BaseURI + '/type', this.httpHeader);
  }

  deleteTicketType(Id: string) {
    return this.http.delete(this.BaseURI + '/type/' + Id, this.httpHeader);
  }

  updateTicketType(Id: string, data: TicketTypeVmDto) {
    return this.http.put(this.BaseURI + '/type/' + Id, data, this.httpHeader);
  }
}
