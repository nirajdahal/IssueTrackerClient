import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GetAllTicketVmDto } from 'src/app/models/Tickets/Ticket';
import { TicketsService } from 'src/app/services/Tickets/tickets.service';
@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrls: ['./all-tickets.component.css']
})
export class AllTicketsComponent implements OnInit {
  public displayedColumns = ['name', 'dateOfBirth', 'address','project', 'details'];
  public dataSource = new MatTableDataSource<GetAllTicketVmDto>();
  constructor(private ticketService: TicketsService) { }
  ngOnInit(): void {
    this.getAllOwners();
  }

  public getAllOwners = () => {
    this.ticketService.getAllTickets()
    .subscribe(res => {
      this.dataSource.data =res as GetAllTicketVmDto[];
    })
  }
  public redirectToDetails = (id: string) => {

  }
  public redirectToUpdate = (id: string) => {

  }
  public redirectToDelete = (id: string) => {

  }
}
