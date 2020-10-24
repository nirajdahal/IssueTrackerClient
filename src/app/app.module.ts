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
    MyTicketsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
