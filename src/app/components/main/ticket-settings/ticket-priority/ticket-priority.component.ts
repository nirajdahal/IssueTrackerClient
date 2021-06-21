import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TicketPriorityVmDto } from 'src/app/models/Tickets/Ticket';
import { TicketSettingsService } from 'src/app/services/Tickets/ticket-settings.service';
@Component({
  selector: 'app-ticket-priority',
  templateUrl: './ticket-priority.component.html',
  styleUrls: ['./ticket-priority.component.css']
})
export class TicketPriorityComponent implements OnInit {
  constructor(private router: Router, private ticketSetting: TicketSettingsService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getAllPriority();
  }
  ticketPriorityName: string = "";
  dataToCreate: TicketPriorityVmDto;
  createPriority() {
    this.dataToCreate = {
      Name: this.ticketPriorityName
    }
    this.ticketSetting.createTicketPriority(this.dataToCreate).subscribe(data => {

      this.toastr.success("Ticket Created Sucessfully", "Success!");
    },
      (err) => {
        if (err.status == 400) {
          this.toastr.warning("Sorry the ticket priority is not valid", 'Failed!');
        }
        if (err.status == 401) {
          this.toastr.warning("Admin hasnot verified your account. Update Fail", 'Unauthorized!');
        }
        else {
          this.toastr.error("Ticket Priority Creation Failed", 'Sorry!');
        }
      });;
  }
  priorityList: TicketPriorityVmDto[];
  getAllPriority() {
    this.ticketSetting.getTicketPriority().subscribe(data => {
      this.priorityList = data;
    });
  }
  priorityToDelete = "";
  openDeleteModal(Id) {
    this.priorityToDelete = Id;
  }
  deletePriority() {
    this.ticketSetting.deleteTicketPriority(this.priorityToDelete).subscribe(data => {
      this.router.navigateByUrl("/home/project/getprojects");
      this.toastr.success("Ticket Priority has been deleted successfully");
      document.getElementById("deleteModalClose").click();
    },
      (err) => {
        if (err.status == 401) {
          this.toastr.warning("Admin hasnot verified your account. Update Fail", 'Unauthorized!');
        }
        else {
          this.toastr.error("Delete Failed", 'Sorry!');
        }
        document.getElementById("deleteModalClose").click();
      });
  }
  ticketToUpdate: TicketPriorityVmDto ={
    Id:"",
    Name:""
  };
  openEditModal(priorityId, priorityName) {
    this.ticketToUpdate = {
      Id: priorityId,
      Name: priorityName
    }
  }
  editPriority() {
    this.ticketSetting.updateTicketPriority(this.ticketToUpdate.Id, this.ticketToUpdate).subscribe(data => {
      this.router.navigateByUrl("/home/project/getprojects");
      this.toastr.success("Project has been updated successfully");
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
      });
  }
}
