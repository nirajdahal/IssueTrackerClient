import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GetAllTicketVmDto, UserTicketVmDto } from 'src/app/models/Tickets/Ticket';
import { TicketsService } from 'src/app/services/Tickets/tickets.service';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrls: ['./all-tickets.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AllTicketsComponent implements OnInit {
  //Columns names, table data from datasource, pagination and sorting
  columnsToDisplay: string[] = ['name','project','manager', 'priority', 'status','type','more'];
  dataSource = new MatTableDataSource<GetAllTicketVmDto>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  expandedDetail:any;
  constructor(private ticketService: TicketsService) {
  }
  ngOnInit() {
    this.getAllOwners();
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
  public getAllOwners = () => {
    this.ticketService.getAllTickets()
      .subscribe(res => {
        this.dataSource.data = res as GetAllTicketVmDto[];
        console.log(this.dataSource.data)
      })
  }
}
