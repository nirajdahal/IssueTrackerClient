import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent implements OnInit {

  ticketId: string = "";
  priorityId: string = "";
  projectId: string = "";
  ticketTitle: string = "";
  ticketDescription: string = "";

  selection=[];
  constructor() { }

  ngOnInit(): void {
  }

}
