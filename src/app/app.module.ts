import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './components/user/registration/registration.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsComponent } from './components/components.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatSortModule } from '@angular/material/sort';
import { ToastrModule } from 'ngx-toastr';
import { UserprofileComponent } from './components/main/userprofile/userprofile.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { JwtModule } from "@auth0/angular-jwt";
import { CreateTicketComponent } from './components/main/tickets/create-ticket/create-ticket.component';
import { UpdateTicketComponent } from './components/main/tickets/update-ticket/update-ticket.component';
import { AllTicketsComponent } from './components/main/tickets/all-tickets/all-tickets.component';
import { MyTicketsComponent } from './components/main/tickets/my-tickets/my-tickets.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorModule } from '@angular/material/paginator';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ChartsModule } from 'ng2-charts';
import { TicketDashbaordComponent } from './components/main/tickets/ticket-dashbaord/ticket-dashbaord.component';
import { AllProjectsComponent } from './components/main/projects/all-projects/all-projects.component';
import { MyProjectsComponent } from './components/main/projects/my-projects/my-projects.component';
import { CreateProjectComponent } from './components/main/projects/create-project/create-project.component';
import { ProjectDashboardComponent } from './components/main/projects/project-dashboard/project-dashboard.component';
import { UpdateProjectComponent } from './components/main/projects/update-project/update-project.component';
import { TicketPriorityComponent } from './components/main/ticket-settings/ticket-priority/ticket-priority.component';
import { TicketStatusComponent } from './components/main/ticket-settings/ticket-status/ticket-status.component';
import { TicketTypeComponent } from './components/main/ticket-settings/ticket-type/ticket-type.component';


export function tokenGetter() {
  return localStorage.getItem("issueTrackerToken");
}
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    MainComponent,
    RegistrationComponent,
    ComponentsComponent,
    UserprofileComponent,
    CreateTicketComponent,
    UpdateTicketComponent,
    AllTicketsComponent,
    MyTicketsComponent,
    TicketDashbaordComponent,
    AllProjectsComponent,
    MyProjectsComponent,
    CreateProjectComponent,
    ProjectDashboardComponent,
    UpdateProjectComponent,
    TicketPriorityComponent,
    TicketStatusComponent,
    TicketTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatExpansionModule,
   MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
