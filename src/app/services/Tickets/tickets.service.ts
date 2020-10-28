import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataForTicketDashboardVm, GetAllTicketVmDto, TicketForCreation, TicketForUpdateDto, TicketPriorityVmDto, TicketStatusVmDto, TicketTypeVmDto } from 'src/app/models/Tickets/Ticket';
@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  readonly BaseURI = 'https://localhost:44392/api';
  httpHeader = { headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8') };
  postTicket: TicketForCreation;
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }
  createTicket(data: TicketForCreation) {
    return this.http.post(this.BaseURI + '/ticket', data, this.httpHeader);
  }
  getTicketType() {
    return this.http.get<TicketTypeVmDto[]>(this.BaseURI + '/type', this.httpHeader);
  }
  getTicketPriority() {
    return this.http.get<TicketPriorityVmDto[]>(this.BaseURI + '/priority', this.httpHeader);
  }
  getTicketStatus() {
    return this.http.get<TicketStatusVmDto[]>(this.BaseURI + '/status', this.httpHeader);
  }
  getAllTickets() {
    return this.http.get<GetAllTicketVmDto[]>(this.BaseURI + '/ticket', this.httpHeader);
  }
  getMyTickets(id: String) {
    return this.http.get<GetAllTicketVmDto[]>(this.BaseURI + '/userticket/' + id, this.httpHeader);
  }
  updateMyTickets(id: String, data:TicketForUpdateDto) {
    var payload = data;
    console.log(data)
    return this.http.put<TicketForUpdateDto>(this.BaseURI + '/ticket/' + id, payload,this.httpHeader);
  }
  deleteMyTickets(id: String) {
    return this.http.delete(this.BaseURI + '/ticket/' + id, this.httpHeader);
  }
  ticketDashboard() {
    return this.http.get<DataForTicketDashboardVm>(this.BaseURI + '/ticket/dashboard', this.httpHeader);
  }

}
