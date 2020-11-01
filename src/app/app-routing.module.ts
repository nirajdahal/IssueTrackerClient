import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { UserComponent } from './components/user/user.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './auth/auth.guard';
import { UserprofileComponent } from './components/main/userprofile/userprofile.component';
import { CreateTicketComponent } from './components/main/tickets/create-ticket/create-ticket.component';
import { AllTicketsComponent } from './components/main/tickets/all-tickets/all-tickets.component';
import { MyTicketsComponent } from './components/main/tickets/my-tickets/my-tickets.component';
import { UpdateTicketComponent } from './components/main/tickets/update-ticket/update-ticket.component';
import { TicketDashbaordComponent } from './components/main/tickets/ticket-dashbaord/ticket-dashbaord.component';
import { AllProjectsComponent } from './components/main/projects/all-projects/all-projects.component';
import { CreateProjectComponent } from './components/main/projects/create-project/create-project.component';
import { MyProjectsComponent } from './components/main/projects/my-projects/my-projects.component';
import { ProjectDashboardComponent } from './components/main/projects/project-dashboard/project-dashboard.component';
import { TicketPriorityComponent } from './components/main/ticket-settings/ticket-priority/ticket-priority.component';
import { TicketStatusComponent } from './components/main/ticket-settings/ticket-status/ticket-status.component';
import { TicketTypeComponent } from './components/main/ticket-settings/ticket-type/ticket-type.component';
import { UserSettingsComponent } from './components/main/user-settings/user-settings.component';
import { DashboardComponent } from './components/main/dashboard/dashboard.component';
const routes: Routes = [
  { path: '', redirectTo: '/user/registration', pathMatch: 'full' },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent }
    ]
  },
  {
    path: 'home', component: MainComponent, canActivate: [AuthGuard],
    children: [
      { path: 'profile', component: UserprofileComponent },
      { path: 'ticket/create', component: CreateTicketComponent },
      { path: 'ticket/gettickets', component: AllTicketsComponent },
      { path: 'ticket/mytickets', component: MyTicketsComponent },
      { path: 'ticket/ticketdashboard', component: TicketDashbaordComponent },
      { path: 'project/getprojects', component: AllProjectsComponent },
      { path: 'project/createproject', component: CreateProjectComponent },
      { path: 'project/myproject', component: MyProjectsComponent },
      { path: 'project/projectDashboard', component: ProjectDashboardComponent },
      { path: 'ticket/priority', component: TicketPriorityComponent },
      { path: 'ticket/status', component: TicketStatusComponent },
      { path: 'ticket/type', component: TicketTypeComponent},
      { path: 'ticket/settings', component: UserSettingsComponent},
      { path: 'dashboard', component: DashboardComponent}



    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
