import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { GetAllTicketVmDto, TicketForUpdateDto, TicketPriorityVmDto, TicketStatusVmDto, TicketTypeVmDto, UserTicketVmDto } from 'src/app/models/Tickets/Ticket';
import { UserVm } from 'src/app/models/User';
import { UserTicket } from 'src/app/models/UserTicket/UserTicketModel';
import { TicketsService } from 'src/app/services/Tickets/tickets.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent implements OnInit {
  ticketId: string = "";
  typeId: string = ""
  priorityId: string = "";
  statusId: string = "";
  projectId: string = "";
  priorityName: string = "";
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
  developerDropdownList: UserVm[] = [];
  selectedDevelopers: UserVm[] = [];
  developerDropdownSettings: IDropdownSettings = {};
  @Input() userTicketInformation: GetAllTicketVmDto;
  usersTicket: UserTicketVmDto[];
  developerList: UserVm[];
  typeName: string;
  statusName: string;
  currentUserRole = "";
  constructor(private router: Router, private ticketService: TicketsService, private toastr: ToastrService, private userService: UserService) { }
  ngOnInit(): void {
    this.getTicketPriority();
    this.getTicketTypes();
    this.getTicketStatus();
    let userInfo = this.userTicketInformation;
    this.ticketTitle = userInfo.Title;
    this.ticketId = userInfo.Id;
    this.ticketDescription = userInfo.Description;
    this.createdAt = userInfo.CreatedAt;
    this.typeId = userInfo.TicketTypeVm.Id;
    this.typeName = userInfo.TicketTypeVm.Name;
    this.priorityId = userInfo.TicketPriorityVm.Id;
    this.priorityName = userInfo.TicketPriorityVm.Name;
    this.statusId = userInfo.TicketStatusVm.Id;
    this.statusName = userInfo.TicketStatusVm.Name;
    this.projectId = userInfo.ProjectVm.Id;
    this.submittedBy = ` ${userInfo.SubmittedByName}, ${userInfo.SubmittedByEmail}`
    this.usersTicket = userInfo.UsersTicketsVm;
    this.getDevelopers();
    this.developerDropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.currentUserRole = this.userService.userRole();
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
  onItemSelect(item: any) {

  }
  onSelectAll(items: any) {

  }
  getDevelopers() {
    this.userService.getAllDevelopers().subscribe(developersList => {
      //setting the multiple dropdownlist with all the developers
      this.developerDropdownList = developersList;
      //the code below helps us populate the selected items in multiple dropdown list
      var developers = this.userTicketInformation.UsersTicketsVm;
      var developerToSelect = [];
      developers.forEach(developer => {
        var developerToBeAdded: UserVm = { Id: developer.Id, Name: developer.ApplicationUser.userName };
        developerToSelect.push(developerToBeAdded);
      });
      this.selectedDevelopers = developerToSelect;
    }
    );
  }

  ticketToUpdate: TicketForUpdateDto;
  updateTicket() {
    var userTicketToUpdate: UserTicket[] = [];
    this.selectedDevelopers.forEach(e => {
      userTicketToUpdate.push({
        Id: e.Id,
        TicketId: this.ticketId
      })
    })
    this.ticketToUpdate = {
      Title: this.ticketTitle,
      Description: this.ticketDescription,
      TTypeId: this.typeId,
      TPriorityId: this.priorityId,
      TStatusId:this.statusId,
      ProjectId: this.projectId,
      UsersTickets: userTicketToUpdate
    }
    this.ticketService.updateMyTickets(this.ticketId, this.ticketToUpdate).subscribe(data => {
      this.router.navigateByUrl("/home/ticket/mytickets");
      this.toastr.success("Ticket has been updated successfully");
    },
      (err) => {
        if (err.status == 400) {
          this.toastr.warning("Sorry the update data is not valid", 'Failed!');
        }
        if (err.status == 401) {
          this.toastr.warning("Admin hasnot verified your account. Update Fail", 'Unauthorized!');
        }
        else {
          this.toastr.error("Update Failed", 'Sorry!');
        }
      })
  }
}
