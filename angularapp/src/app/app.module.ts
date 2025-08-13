import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ErrorComponent } from './components/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { AdminEditConferenceEventComponent } from './components/admin-edit-conference-event/admin-edit-conference-event.component';
import { AdminViewConferenceEventComponent } from './components/admin-view-conference-event/admin-view-conference-event.component';
import { AdminCreateConferenceEventComponent } from './components/admin-create-conference-event/admin-create-conference-event.component';
import { UserViewConferenceEventComponent } from './components/user-view-conference-event/user-view-conference-event.component';
import { UserAppliedConferenceEventComponent } from './components/user-applied-conference-event/user-applied-conference-event.component';
import { UserBookConferenceEventComponent } from './components/user-book-conference-event/user-book-conference-event.component';
import { AdminViewBookingsComponent } from './components/admin-view-bookings/admin-view-bookings.component';
import { ConferenceEventBookingsPieChartComponent } from './components/conference-event-bookings-pie-chart/conference-event-bookings-pie-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ErrorComponent,
    NavbarComponent,
    AdminviewfeedbackComponent,
    UserviewfeedbackComponent,
    UseraddfeedbackComponent,
    AdminnavComponent,
    UsernavComponent,
    AdminEditConferenceEventComponent,
    AdminViewConferenceEventComponent,
    AdminCreateConferenceEventComponent,
    UserViewConferenceEventComponent,
    UserAppliedConferenceEventComponent,
    UserBookConferenceEventComponent,
    AdminViewBookingsComponent,
    ConferenceEventBookingsPieChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
