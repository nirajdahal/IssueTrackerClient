import { Injectable } from '@angular/core';
import { GetAllTicketVmDto } from 'src/app/models/Tickets/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketDetailService {

  private param:GetAllTicketVmDto;
  setParam(value) {
    this.param = value;
  }
  getParam() {
    return this.param;
  }
  constructor() { }
}
