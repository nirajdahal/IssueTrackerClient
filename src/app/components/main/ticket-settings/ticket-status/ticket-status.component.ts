import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TicketStatusVmDto } from 'src/app/models/Tickets/Ticket';
import { TicketSettingsService } from 'src/app/services/Tickets/ticket-settings.service';

@Component({
  selector: 'app-ticket-status',
  templateUrl: './ticket-status.component.html',
  styleUrls: ['./ticket-status.component.css']
})
export class TicketStatusComponent implements OnInit {
  constructor(private router: Router, private ticketSetting: TicketSettingsService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getAllstatus();
  }
  TicketStatusName: string = "";
  dataToCreate: TicketStatusVmDto;
  createstatus() {
    this.dataToCreate = {
      Name: this.TicketStatusName
    }
    this.ticketSetting.createTicketStatus(this.dataToCreate).subscribe(data => {
      console.log(data);
      this.toastr.success("Ticket Created Sucessfully", "Success!");
    },
      (err) => {
        if (err.status == 400) {
          this.toastr.warning("Sorry the ticket status is not valid", 'Failed!');
        }
        if (err.status == 401) {
          this.toastr.warning("Admin hasnot verified your account. Update Fail", 'Unauthorized!');
        }
        else {
          this.toastr.error("Ticket status Creation Failed", 'Sorry!');
        }
      });;
  }
  statusList: TicketStatusVmDto[];
  getAllstatus() {
    this.ticketSetting.getTicketStatus().subscribe(data => {
      this.statusList = data;
    });
  }
  statusToDelete = "";
  openDeleteModal(Id) {
    this.statusToDelete = Id;
  }
  deletestatus() {
    this.ticketSetting.deleteTicketStatus(this.statusToDelete).subscribe(data => {
      this.router.navigateByUrl("/home/project/getprojects");
      this.toastr.success("Ticket status has been deleted successfully");
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
  ticketToUpdate: TicketStatusVmDto ={
    Id:"",
    Name:""
  };
  openEditModal(statusId, statusName) {
    this.ticketToUpdate = {
      Id: statusId,
      Name: statusName
    }
  }
  editstatus() {
    this.ticketSetting.updateTicketStatus(this.ticketToUpdate.Id, this.ticketToUpdate).subscribe(data => {
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