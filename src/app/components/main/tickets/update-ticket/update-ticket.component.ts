import { Component, Input, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { GetAllTicketVmDto, TicketPriorityVmDto, TicketStatusVmDto, TicketTypeVmDto, UserTicketVmDto } from 'src/app/models/Tickets/Ticket';
import { TicketsService } from 'src/app/services/Tickets/tickets.service';
@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent implements OnInit {
  ticketId: string = "";
  priorityId: string = "";
  statusId: string = "";
  projectId: string = "";
  ticketTitle: string = "";
  ticketDescription: string = "";
  createdAt:Date= new Date();
  submittedBy:string=""
  ticketTypeValues: TicketTypeVmDto[] = [];
  ticketPriority: TicketPriorityVmDto[] = [];
  ticketStatus: TicketStatusVmDto[] = [];

  showTicketType: boolean = false;
  showTicketStatus: boolean = false;
  showTicketPriority: boolean = false;
  //dropDown
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  @Input() userTicketInformation: GetAllTicketVmDto;
  usersTicket: UserTicketVmDto[];
  constructor(private ticketService: TicketsService, private toastr: ToastrService) { }
  ngOnInit(): void {

    this.getTicketPriority();
    this.getTicketTypes();
    this.getTicketStatus();

    let userInfo = this.userTicketInformation;
    this.ticketTitle = userInfo.Title;
    this.ticketDescription = userInfo.Description;
    this.createdAt = userInfo.CreatedAt;
    this.submittedBy = ` ${userInfo.SubmittedByName}, ${userInfo.SubmittedByEmail}`
    this.usersTicket = userInfo.UsersTicketsVm;
    //multiple select options settings
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  ngAfterViewInit(): void {
    console.log(this.userTicketInformation);
  }
  getTicketTypes() {
    this.ticketService.getTicketType().subscribe(data => {
      this.ticketTypeValues = data;
      this.showTicketType = true;
    },
      err => {
        if (err.status == 401) {
          this.toastr.warning("Admin hasnot verified your account", 'Unauthorized!');
        }
        else {
          this.toastr.error("Couldnot Get Ticket Types", 'Sorry!');
        }
      });
  }
  getTicketPriority() {
    this.ticketService.getTicketPriority().subscribe(data => {
      this.ticketPriority = data;
      this.showTicketPriority = true;
    },
      err => {
        if (err.status == 401) {
          this.toastr.warning("Admin hasnot verified your account", 'Unauthorized!');
        }
        else {
          this.toastr.error("Couldnot Get Ticket Priority", 'Sorry!');
        }
      });
  }
  getTicketStatus() {
    this.ticketService.getTicketStatus().subscribe(data => {
      this.ticketStatus = data;
      this.showTicketPriority = true;
    },
      err => {
        if (err.status == 401) {
          this.toastr.warning("Admin hasnot verified your account", 'Unauthorized!');
        }
        else {
          this.toastr.error("Couldnot Get Ticket Priority", 'Sorry!');
        }
      });
  }
  UpdateTicket() {
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
