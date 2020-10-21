import { Component, OnInit } from '@angular/core';
import { TicketsService } from 'src/app/services/Tickets/tickets.service';

@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrls: ['./all-tickets.component.css']
})
export class AllTicketsComponent implements OnInit {

  constructor(private ticketService: TicketsService) { }

  ngOnInit(): void {
    this.ticketService.getAllTickets().subscribe(data => {
      console.log(data);
    })
  }

}
