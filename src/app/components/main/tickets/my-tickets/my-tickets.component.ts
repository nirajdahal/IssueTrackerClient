import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetAllTicketVmDto } from 'src/app/models/Tickets/Ticket';
import { TicketsService } from 'src/app/services/Tickets/tickets.service';
@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MyTicketsComponent implements OnInit {

  //Columns names, table data from datasource, pagination and sorting
  columnsToDisplay: string[] = ['name', 'project', 'manager', 'priority', 'status', 'type', 'edit'];
  dataSource = new MatTableDataSource<GetAllTicketVmDto>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  expandedDetail: any;
  constructor(private ticketService: TicketsService) {
  }
  ngOnInit() {
    this.getTicketsForUser();
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.Title.trim().toLocaleLowerCase()
        + data.ProjectVm.Title.trim().toLocaleLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  public getTicketsForUser = () => {
    this.ticketService.getMyTickets("fbb923e9-10c9-44c3-aada-6b88e742cc8d")
      .subscribe(res => {
        this.dataSource.data = res as GetAllTicketVmDto[];
        console.log(this.dataSource.data)
      })
  }
}
