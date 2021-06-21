import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateRoles } from 'src/app/models/User';
import { AdminAcessServiceService } from 'src/app/services/AdminAcess/admin-acess-service.service';

@Component({
  selector: 'app-createrole',
  templateUrl: './createrole.component.html',
  styleUrls: ['./createrole.component.css']
})
export class CreateroleComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminAcessServiceService, private toastr: ToastrService) { }


  ngOnInit(): void {
  }

  createAllRole(){

    var rolesToAdd :string[]=["Project Manager", "Admin", "Submitter", "Developer", "User"]

    var createrole = new CreateRoles;
    createrole.Roles = rolesToAdd;
    this.adminService.createRoles(createrole).subscribe(
      res => {
        this.toastr.success("Created Roles Successfully");
      },err => {
        this.toastr.error("Role creation failed");
      }
    )

  }
}
