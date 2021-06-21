import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TicketTypeVmDto } from 'src/app/models/Tickets/Ticket';
import { TicketSettingsService } from 'src/app/services/Tickets/ticket-settings.service';

@Component({
  selector: 'app-ticket-type',
  templateUrl: './ticket-type.component.html',
  styleUrls: ['./ticket-type.component.css']
})
export class TicketTypeComponent implements OnInit {

  constructor(private router: Router, private ticketSetting: TicketSettingsService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getAlltype();
  }
  ticketTypeName: string = "";
  dataToCreate: TicketTypeVmDto;
  createtype() {
    this.dataToCreate = {
      Name: this.ticketTypeName
    }
    this.ticketSetting.createTicketType(this.dataToCreate).subscribe(data => {

      this.toastr.success("Ticket Created Sucessfully", "Success!");
    },
      (err) => {
        if (err.status == 400) {
          this.toastr.warning("Sorry the ticket type is not valid", 'Failed!');
        }
        if (err.status == 401) {
          this.toastr.warning("Admin hasnot verified your account. Update Fail", 'Unauthorized!');
        }
        else {
          this.toastr.error("Ticket type Creation Failed", 'Sorry!');
        }
      });;
  }
  typeList: TicketTypeVmDto[];
  getAlltype() {
    this.ticketSetting.getTicketType().subscribe(data => {
      this.typeList = data;
    });
  }
  typeToDelete = "";
  openDeleteModal(Id) {
    this.typeToDelete = Id;
  }
  deletetype() {
    this.ticketSetting.deleteTicketType(this.typeToDelete).subscribe(data => {
      this.router.navigateByUrl("/home/project/getprojects");
      this.toastr.success("Ticket type has been deleted successfully");
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
  ticketToUpdate: TicketTypeVmDto ={
    Id:"",
    Name:""
  };
  openEditModal(typeId, typeName) {
    this.ticketToUpdate = {
      Id: typeId,
      Name: typeName
    }
  }
  edittype() {
    this.ticketSetting.updateTicketType(this.ticketToUpdate.Id, this.ticketToUpdate).subscribe(data => {
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