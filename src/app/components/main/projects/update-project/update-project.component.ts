import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import {  ProjectForUpdateDto, ProjectVmDto } from 'src/app/models/Projects/Project';
import { UserVm } from 'src/app/models/User';
import { ProjectManager } from 'src/app/models/UserTicket/UserTicketModel';
import { ProjectsService } from 'src/app/services/Projects/projects.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  managerDropdownList: UserVm[] = [];
  selectedManagers: UserVm[] = [];
  managerDropdownSettings: IDropdownSettings = {};

  @Input() projectInformation: ProjectVmDto;
  projectDescription: string = "";
  projectTitle: string = "";
  projectId: string = "";
  constructor(private router: Router, private toastr: ToastrService,private userService: UserService, private projectService: ProjectsService) { }
  ngOnInit(): void {
    this.getProjectManagers();
    this.currentUserRole = this.userService.userRole();
    this.projectId = this.projectInformation.Id;
    this.projectTitle = this.projectInformation.Title;
    this.projectDescription = this.projectInformation.Description;
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
      //the code below helps us populate the selected items in multiple dropdown list
      var managers = this.projectInformation.ProjectManagers;
      var managerToSelect = [];
      managers.forEach(manager => {
        var managerToBeAdded: UserVm = { Id: manager.Id, Name: manager.ApplicationUser.userName };
        managerToSelect.push(managerToBeAdded);
      });
      this.selectedManagers = managerToSelect;

    }
    );
  }
  currentUserRole = "";
  dataToUpdate: ProjectForUpdateDto;
  updateProjects() {
    var projectManagerToUpdate: ProjectManager[] = [];
    var rolesAllowded = ["Admin", "Project Manager"].includes(this.currentUserRole)
    if (rolesAllowded) {
      this.selectedManagers.forEach(e => {
        projectManagerToUpdate.push({
          Id: e.Id,
          ProjectId: this.projectId
        })
      })
    }

    this.dataToUpdate = {
      Title: this.projectTitle,
      Description: this.projectDescription,
      ProjectManagers: projectManagerToUpdate
    }

    this.projectService.updateProject(this.projectId, this.dataToUpdate).subscribe(data => {
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
