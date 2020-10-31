import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GetAllTicketVmDto, UserTicketVmDto } from 'src/app/models/Tickets/Ticket';
import { TicketsService } from 'src/app/services/Tickets/tickets.service';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
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
  columnsToDisplay: string[] = ['name', 'project', 'manager', 'priority', 'status', 'type', 'delete', 'edit'];
  dataSource = new MatTableDataSource<GetAllTicketVmDto>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  expandedDetail: any;
  constructor(private ticketService: TicketsService, private toastr: ToastrService) {
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

  ticketTodeleteId = "";
  getTicketToDelete(Id) {
    this.ticketTodeleteId = Id;
  }
  deleteTicket() {
    console.log(this.ticketTodeleteId);

    this.ticketService.deleteMyTickets(this.ticketTodeleteId).subscribe(data => {
      console.log(data);
      this.toastr.success("Ticket Deleted Sucessfully", "Success!");
      document.getElementById("deleteModalClose").click();
    },
      (err) => {

        if (err.status == 401) {
          this.toastr.warning("Can't Delelte as this ticket doesnot belong to you", 'Unauthorized!');
        }
        else {
          this.toastr.error("Ticket Deletion Failed", 'Sorry!');
        }
        document.getElementById("deleteModalClose").click();
      });
  }
  userInfoToSend: GetAllTicketVmDto;
  loadUpdateTicket: boolean = false;
  editTicket(id) {
    //selecting the ticket with its id
    var userTickets = this.dataSource.data;
    var dataToSend = userTickets.find(x => x.Id === id);
    this.userInfoToSend = dataToSend;
    this.loadUpdateTicket = true;
  }
}
