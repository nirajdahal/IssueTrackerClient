import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { DashboardDataForTicket } from 'src/app/models/Tickets/Ticket';
import { TicketsService } from 'src/app/services/Tickets/tickets.service';
@Component({
  selector: 'app-ticket-dashbaord',
  templateUrl: './ticket-dashbaord.component.html',
  styleUrls: ['./ticket-dashbaord.component.css']
})
export class TicketDashbaordComponent implements OnInit {

  // Pie
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

  constructor(private ticketService: TicketsService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.ticketService.ticketDashboard().subscribe(data => {
      this.ticketTypeData(data.TicketTypeData);
      this.ticketPriorityData(data.TicketPriorityData);
      this.ticketStatusData(data.TicketStatusData);
    })
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
}
