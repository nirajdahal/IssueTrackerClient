import { Component, Input, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { GetAllTicketVmDto, TicketPriorityVmDto, TicketStatusVmDto, TicketTypeVmDto, UserTicketVmDto } from 'src/app/models/Tickets/Ticket';
import { UserVm } from 'src/app/models/User';
import { TicketsService } from 'src/app/services/Tickets/tickets.service';
import { UserService } from 'src/app/services/user.service';
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
  createdAt: Date = new Date();
  submittedBy: string = ""
  ticketTypeValues: TicketTypeVmDto[] = [];
  ticketPriority: TicketPriorityVmDto[] = [];
  ticketStatus: TicketStatusVmDto[] = [];
  showTicketType: boolean = false;
  showTicketStatus: boolean = false;
  showTicketPriority: boolean = false;
  //dropDown
  dropdownList: UserVm[] = [];
  selectedItems: UserVm[] = [];
  dropdownSettings: IDropdownSettings = {};
  @Input() userTicketInformation: GetAllTicketVmDto;
  usersTicket: UserTicketVmDto[];
  developerList: UserVm[];
  constructor(private ticketService: TicketsService, private toastr: ToastrService, private userService: UserService) { }
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
    this.getDevelopers();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  ngAfterViewInit(): void {
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
  getDevelopers() {
    this.userService.getAllDevelopers().subscribe(developersList => {
      //setting the multiple dropdownlist with all the developers
      this.dropdownList = developersList;

      //the code below helps us populate the selected items in multiple dropdown list
      var developers = this.userTicketInformation.UsersTicketsVm;
      var developerToSelect = [];
      developers.forEach(developer => {
        var developerToBeAdded: UserVm = { Id: developer.Id, Name: developer.ApplicationUser.userName };
        developerToSelect.push(developerToBeAdded);
      });
      this.selectedItems = developerToSelect;
    }
    );
  }

  updateTicket(){

  }
}
