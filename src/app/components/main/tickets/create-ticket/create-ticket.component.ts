import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProjectIdNameVm } from 'src/app/models/Projects/Project';
import { TicketForCreation, TicketPriorityVmDto, TicketTypeVmDto } from 'src/app/models/Tickets/Ticket';
import { ProjectsService } from 'src/app/services/Projects/projects.service';
import { TicketsService } from 'src/app/services/Tickets/tickets.service';
@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {
  ticketForCreation: TicketForCreation;
  ticketTypeValues: TicketTypeVmDto[] = [];
  ticketPriority: TicketPriorityVmDto[] = [];
  ticketProjectIdName: ProjectIdNameVm[] = [];
  showTicketType: boolean = false;
  showTicketStatus: boolean = false;
  showTicketPriority: boolean = false;
  showProjectIdName: boolean = false;
  typeId: string = "";
  priorityId: string = "";
  projectId: string = "";
  ticketTitle: string = "";
  ticketDescription: string = "";
  constructor(private projectService: ProjectsService, private ticketService: TicketsService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getTicketPriority();
    this.getTicketTypes();
    this.getProjectNameId();
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
  getProjectNameId() {
    this.projectService.getProjectIdName().subscribe(data => {
      this.ticketProjectIdName = data;
      this.showProjectIdName = true;
    },
      err => {
        if (err.status == 401) {
          this.toastr.warning("Admin hasnot verified your account", 'Unauthorized!');
        }
        else {
          this.toastr.error("Couldnot Get Project", 'Sorry!');
        }
      });
  }
  createTicket() {
    this.ticketForCreation = {
      "TTypeId": this.typeId,
      "TPriorityId": this.priorityId,
      "Title": this.ticketTitle,
      "Description": this.ticketDescription,
      "ProjectId": this.projectId
    }
    console.log(this.ticketForCreation)
    this.ticketService.createTicket(this.ticketForCreation).subscribe(data => {
      console.log(data);
      this.toastr.success("Tciket Created Sucessfully", "Success!");
      this.ticketTitle="";
      this.ticketDescription = "";
    },
    (err) => {
      if (err.status == 400) {
        this.toastr.warning("Sorry the ticket data is not valid", 'Failed!');
      }
      if (err.status == 401) {
        this.toastr.warning("Admin hasnot verified your account. Update Fail", 'Unauthorized!');
      }
      else {
        this.toastr.error("Ticket Creation Failed", 'Sorry!');
      }
    });
  }
}
