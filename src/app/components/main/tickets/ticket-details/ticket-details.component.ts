import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TicketCommentVmDto } from 'src/app/models/Tickets/Comment';
import { GetAllTicketVmDto } from 'src/app/models/Tickets/Ticket';
import { TicketCommentService } from 'src/app/services/Tickets/ticket-comment.service';
import { TicketDetailService } from 'src/app/services/Tickets/ticketdetail.service';
import { TicketsService } from 'src/app/services/Tickets/tickets.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  loadDetails:boolean=false;
  constructor(
    private router: Router,
    private ticketDetailService: TicketDetailService,
    private ticketCommentService:TicketCommentService,
    private toastr: ToastrService,
    private ticketService: TicketsService) { }
  userTicketInformation: GetAllTicketVmDto;
  ngOnInit(): void {
    this.userTicketInformation = this.ticketDetailService.getParam();
    this.loadDetails=true;
    if (this.userTicketInformation == null) {
      this.router.navigate(['/home/ticket/mytickets']);
    }
    this.getCommentsForTicket();

  }

  comments:TicketCommentVmDto[];
  loadComments :boolean=false;
  getCommentsForTicket(){
    this.ticketCommentService.getTicketComment(this.userTicketInformation.Id).subscribe(data =>{
      this.comments = data
      this.comments.reverse();
      this.loadComments = true;
    }
    );

  }

  ticketComment: string="";
  createComment() {

    var data: TicketCommentVmDto={
      TicketId:this.userTicketInformation.Id,
      Description:this.ticketComment
    }
    this.ticketCommentService.createTicket(data).subscribe(res => {
      this.toastr.success("Comment Created Sucessfully", "Success!");
      this.ticketComment="";
      this.getCommentsForTicket();
    },
    (err) => {
      if (err.status == 400) {
        this.toastr.warning("Sorry the comment data is not valid", 'Failed!');
      }
      if (err.status == 401) {
        this.toastr.warning("Admin hasnot verified your account. Update Fail", 'Unauthorized!');
      }
      else {
        this.toastr.error("Comment Creation Failed", 'Sorry!');
      }
    })
  }
}
