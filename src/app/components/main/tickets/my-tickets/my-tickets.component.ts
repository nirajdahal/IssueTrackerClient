import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { GetAllTicketVmDto } from 'src/app/models/Tickets/Ticket';
import { TokenVal } from 'src/app/models/TokenModel';
import { TicketDetailService } from 'src/app/services/Tickets/ticketdetail.service';
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
  columnsToDisplay: string[] = ['name', 'project', 'manager', 'priority', 'status', 'type', 'delete', 'edit'];
  dataSource = new MatTableDataSource<GetAllTicketVmDto>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  expandedDetail: any;
  constructor(
    private ticketDetailService: TicketDetailService,
    private router: Router,
    private ticketService: TicketsService,
    private jwtHelper: JwtHelperService,
    private toastr: ToastrService) {
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
  tokenVal: TokenVal;
  public getTicketsForUser = () => {
    var token = localStorage.getItem("issueTrackerToken")
    if (token !== null) {
      this.tokenVal = this.jwtHelper.decodeToken(token);
      var userId = this.tokenVal.UserID;
      this.ticketService.getMyTickets(userId)
        .subscribe(res => {
          this.dataSource.data = res as GetAllTicketVmDto[];

        })
    }
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
  ticketTodeleteId = "";
  getTicketToDelete(Id) {
    this.ticketTodeleteId = Id;
  }
  deleteTicket() {

    // this.ticketService.deleteMyTickets(this.ticketTodeleteId);
    this.ticketService.deleteMyTickets(this.ticketTodeleteId).subscribe(data => {

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
  loadTicketDetail: boolean = false;
  ticketDetails(id) {
    var userTickets = this.dataSource.data;
    var dataToSave = userTickets.find(x => x.Id === id);
    this.ticketDetailService.setParam(dataToSave);
    this.router.navigate(['/home/ticket/details']);

  }

}

