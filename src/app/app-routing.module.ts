import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { UserComponent } from './components/user/user.component';
import {MainComponent} from './components/main/main.component';
import { AuthGuard } from './auth/auth.guard';
import { UserprofileComponent } from './components/main/userprofile/userprofile.component';
import { CreateTicketComponent } from './components/main/tickets/create-ticket/create-ticket.component';
const routes: Routes = [
  {path:'',redirectTo:'/user/registration',pathMatch:'full'},
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent }
    ]
  },
  {path: 'home', component: MainComponent,canActivate:[AuthGuard],
  children: [
    { path: 'profile', component: UserprofileComponent},
    { path: 'ticket/create', component: CreateTicketComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
