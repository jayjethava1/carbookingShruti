import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookComponent} from './components/book/book.component'
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookingComponent } from './components/booking/booking.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import {AcceptBookingComponent} from './components/accept-booking/accept-booking.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  {path:'book',component: BookComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'booking', component: BookingComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  {path: 'acceptbooking', component: AcceptBookingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
