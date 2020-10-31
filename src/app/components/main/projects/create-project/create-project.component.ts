import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { ProjectForCreation } from 'src/app/models/Projects/Project';
import { UserVm } from 'src/app/models/User';
import { ProjectManager } from 'src/app/models/UserTicket/UserTicketModel';
import { ProjectsService } from 'src/app/services/Projects/projects.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  managerDropdownList: UserVm[] = [];
  selectedManagers: UserVm[] = [];
  managerDropdownSettings: IDropdownSettings = {};
  projectDescription: string = "";
  projectTitle: string = "";
  currentUserRole: string;
  constructor(private router: Router, private toastr: ToastrService,private userService: UserService, private projectService: ProjectsService) { }
  ngOnInit(): void {
    this.getProjectManagers();
    this.currentUserRole = this.userService.userRole();

    this.managerDropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  getProjectManagers() {
    this.userService.getProjectManagers().subscribe(managerList => {
      //setting the multiple dropdownlist with all the managers
      this.managerDropdownList = managerList;
    }
    );
  }

  dataToUpdate:ProjectForCreation;
  createProject(){
    var projectManagerToAssign : ProjectManager[]=[];
    var rolesAllowded = ["Admin", "Project Manager"].includes(this.currentUserRole)
    if (rolesAllowded) {
      this.selectedManagers.forEach(e => {
        projectManagerToAssign.push({
          Id: e.Id,
        })
      })
    }

    this.dataToUpdate={
      Title:this.projectTitle,
      Description:this.projectDescription,
      ProjectManagers:projectManagerToAssign
    }
    console.log(projectManagerToAssign);
    this.projectService.createProject( this.dataToUpdate).subscribe(data => {
      this.router.navigateByUrl("/home/project/getprojects");
      this.toastr.success("Project has been updated successfully");

    },
      (err) => {
        if (err.status == 400) {
          this.toastr.warning("Sorry the data to create is not valid", 'Failed!');
        }
        if (err.status == 401) {
          this.toastr.warning("Admin hasnot verified your account. Create Failed", 'Unauthorized!');
        }
        else {
          this.toastr.error("Create Failed Failed", 'Sorry!');
        }
      });
  }
  }
