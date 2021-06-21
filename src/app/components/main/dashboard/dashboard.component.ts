import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { DashboardDataForTicket } from 'src/app/models/Tickets/Ticket';
import { UserRolesCount } from 'src/app/models/User';
import { DashboardServiceService } from 'src/app/services/Dashboard/dashboard-service.service';
import { TicketsService } from 'src/app/services/Tickets/tickets.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  // bar chart
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Total Tickets & Projects'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [0], label: 'Projects' },
    { data: [0], label: 'Tickets' },
  ];


   // Pie charts
   public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabelsTypes: Label[] = [];
  public pieChartDataTypes: SingleDataSet = [0,0,0,0,0,0,0,0,0,0,0];
  public pieChartLabelsPriority: Label[] = [];
  public pieChartDataPriority: SingleDataSet = [0,0,0,0,0,0,0,0,0,0,0];
  public pieChartLabelsStatus: Label[] = [];
  public pieChartDataStatus: SingleDataSet = [0,0,0,0,0,0,0,0,0,0,0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private dashboardService:DashboardServiceService, private ticketService: TicketsService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

  }
  totalTicketsNumber:number = 0;
  ngOnInit() {
    this.ticketService.ticketDashboard().subscribe(data => {
      this.ticketTypeData(data.TicketTypeData);
      this.ticketPriorityData(data.TicketPriorityData);
      this.ticketStatusData(data.TicketStatusData);
      this.totalTicketsNumber = data.totalTickets;
    })
    this.getUserRolesCount();
    this.getProjectTicketCount()
  }

  ticketTypeData(data: DashboardDataForTicket[]){
    var chartLabels: Label[] = [];
    var chartData: SingleDataSet = [];
    data.forEach(element => {
      chartLabels.push(element.Name);
      chartData.push(element.Count);
    });

    this.pieChartLabelsTypes = chartLabels;
    this.pieChartDataTypes = chartData;
  }

  ticketPriorityData(data: DashboardDataForTicket[]){
    var chartLabels: Label[] = [];
    var chartData: SingleDataSet = [];
    data.forEach(element => {
      chartLabels.push(element.Name);
      chartData.push(element.Count);
    });

    this.pieChartLabelsPriority = chartLabels;
    this.pieChartDataPriority = chartData;
  }

  ticketStatusData(data: DashboardDataForTicket[]){
    var chartLabels: Label[] = [];
    var chartData: SingleDataSet = [];
    data.forEach(element => {
      chartLabels.push(element.Name);
      chartData.push(element.Count);
    });

    this.pieChartLabelsStatus= chartLabels;
    this.pieChartDataStatus = chartData;
  }
  userRolesCount :UserRolesCount[] = [];
  showUserRoleCount = false;
  getUserRolesCount(){

    this.dashboardService.getUserRoles().subscribe(res=> {
      this.userRolesCount = res;
      this.showUserRoleCount = true;
    })
  }



  getProjectTicketCount(){
    this.dashboardService.getProjectTicket().subscribe(res => {
      this.barChartData = [

        { data: [res.ProjectCount], label: 'Projects' },
      { data: [res.TicketCount], label: 'Tickets' },
      {data:[0], label:""}]
    })
  }

}


