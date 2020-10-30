import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ProjectDto } from 'src/app/models/Projects/Project';
import { ProjectsService } from 'src/app/services/Projects/projects.service';
import { TicketsService } from 'src/app/services/Tickets/tickets.service';
@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
  , animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AllProjectsComponent implements OnInit {
  //Columns names, table data from datasource, pagination and sorting
  columnsToDisplay: string[] = ['name', 'description', 'manager', 'delete', 'edit', 'more'];
  dataSource = new MatTableDataSource<ProjectDto>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  expandedDetail: any;
  constructor(private projectService: ProjectsService, private toastr: ToastrService) {
  }
  ngOnInit() {
    this.getAllOwners();
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.Title.trim().toLocaleLowerCase()
        + data.Description.trim().toLocaleLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  public getAllOwners = () => {
    this.projectService.getAllProjects()
      .subscribe(res => {
        this.dataSource.data = res as ProjectDto[];
        console.log(this.dataSource.data)
      })
  }
  projectToDeleteId = "";
  getProjectToDelete(Id) {
    this.projectToDeleteId = Id;
  }
  deleteTicket() {

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
  projectToSend: ProjectDto;
  getProjectToUpdate(Id) {
    var allProjects = this.dataSource.data;
    this.projectToSend = allProjects.find(x => x.Id === Id);
    this.loadUpdateProject = true;
  }
}

