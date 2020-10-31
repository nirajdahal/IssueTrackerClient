import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { ProjectVmDto } from 'src/app/models/Projects/Project';
import { TokenVal } from 'src/app/models/TokenModel';
import { ProjectsService } from 'src/app/services/Projects/projects.service';
@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css'],
   animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MyProjectsComponent implements OnInit {
  //Columns names, table data from datasource, pagination and sorting
  columnsToDisplay: string[] = ['name', 'description', 'manager', 'delete', 'edit', 'more'];
  dataSource = new MatTableDataSource<ProjectVmDto>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  expandedDetail: any;
  constructor(private projectService: ProjectsService, private jwtHelper: JwtHelperService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.getMyProjects();
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.Title.trim().toLocaleLowerCase()
        + data.Description.trim().toLocaleLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  tokenVal: TokenVal;
  getMyProjects() {
    var token = localStorage.getItem("issueTrackerToken")
    if (token !== null) {
      this.tokenVal = this.jwtHelper.decodeToken(token);
      var userId = this.tokenVal.UserID;
      this.projectService.getAllProjectsForUser(userId).subscribe(data => {
        this.dataSource.data = data
      })
    }
  }
  projectToDeleteId = "";
  deleteProject() {
    this.projectService.deleteProject(this.projectToDeleteId).subscribe(data => {
      console.log(data);
      this.toastr.success("Ticket Deleted Sucessfully", "Success!");
      document.getElementById("deleteModalClose").click();
    },
      (err) => {
        if (err.status == 401) {
          this.toastr.warning("Can't Delete as this project as it doesnot belong to you", 'Unauthorized!');
        }
        else {
          this.toastr.error("Project Deletion Failed", 'Sorry!');
        }
        document.getElementById("deleteModalClose").click();
      });
  }
  loadUpdateProject: boolean = false;
  projectToSend: ProjectVmDto;
  getProjectToUpdate(Id) {
    var allProjects = this.dataSource.data;
    this.projectToSend = allProjects.find(x => x.Id === Id);
    this.loadUpdateProject = true;
  }
}
