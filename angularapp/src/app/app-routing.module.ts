import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/authguard/auth.guard';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { AdminCreateConferenceEventComponent } from './components/admin-create-conference-event/admin-create-conference-event.component';
import { AdminViewConferenceEventComponent } from './components/admin-view-conference-event/admin-view-conference-event.component';
import { AdminEditConferenceEventComponent } from './components/admin-edit-conference-event/admin-edit-conference-event.component';
import { UserBookConferenceEventComponent } from './components/user-book-conference-event/user-book-conference-event.component';
import { UserViewConferenceEventComponent } from './components/user-view-conference-event/user-view-conference-event.component';
import { UserAppliedConferenceEventComponent } from './components/user-applied-conference-event/user-applied-conference-event.component';
import { AdminViewBookingsComponent } from './components/admin-view-bookings/admin-view-bookings.component';
import { ConferenceEventBookingsPieChartComponent } from './components/conference-event-bookings-pie-chart/conference-event-bookings-pie-chart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'admin/add/conference-event', component: AdminCreateConferenceEventComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/conference-events', component: AdminViewConferenceEventComponent, canActivate: [AuthGuard] },
  { path: 'admin/edit-conference-event/:id', component: AdminEditConferenceEventComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/bookings', component: AdminViewBookingsComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/bookings/piechart', component: ConferenceEventBookingsPieChartComponent, canActivate: [AuthGuard] },
  { path: 'user/book-conference-event', component: UserBookConferenceEventComponent, canActivate: [AuthGuard] },
  { path: 'user/view/conference-events', component: UserViewConferenceEventComponent, canActivate: [AuthGuard] },
  { path: 'user/view/applied-conference-event', component: UserAppliedConferenceEventComponent, canActivate: [AuthGuard] },
  { path: 'admin/view/feedback', component: AdminviewfeedbackComponent, canActivate: [AuthGuard] },
  { path: 'user/view/feedback', component: UserviewfeedbackComponent, canActivate: [AuthGuard] },
  { path: 'user/add/feedback', component: UseraddfeedbackComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
