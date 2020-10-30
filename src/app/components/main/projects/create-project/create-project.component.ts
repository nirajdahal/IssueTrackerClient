import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserVm } from 'src/app/models/User';
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
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.getProjectManagers();
  }
  getProjectManagers() {
    this.userService.getProjectManagers().subscribe(managerList => {
      //setting the multiple dropdownlist with all the managers
      this.managerDropdownList = managerList;
    }
    );
  }
  createProject(){

  }}
