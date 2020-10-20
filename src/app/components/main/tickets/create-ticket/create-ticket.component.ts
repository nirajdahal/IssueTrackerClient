import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProjectIdNameVm } from 'src/app/models/Projects/Project';
import { TicketForCreation, TicketPriorityVm, TicketTypeVm } from 'src/app/models/Tickets/Ticket';
import { ProjectsService } from 'src/app/services/Projects/projects.service';
import { TicketsService } from 'src/app/services/Tickets/tickets.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

  ticketForCreation: TicketForCreation;
  ticketTypeValues: TicketTypeVm[] = [];
  ticketPriority: TicketPriorityVm[] = [];
  ticketProjectIdName: ProjectIdNameVm[] = [];
  showTicketType: boolean = false;
  showTicketStatus: boolean = false;
  showTicketPriority: boolean = false;
  showProjectIdName: boolean = false;
  ticketId: string = "";
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
      console.log(this.ticketTypeValues);
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
      console.log(this.ticketTypeValues);
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
      "TTypeId": this.ticketId,
      "TPriorityId": this.priorityId,
      "Title": this.ticketTitle,
      "Description": this.ticketDescription,
      "ProjectId": this.projectId

    }
    this.ticketService.createTicket(this.ticketForCreation).subscribe(data => {
      console.log(data)
    });
  }


}
