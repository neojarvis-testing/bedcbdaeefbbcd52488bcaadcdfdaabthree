// admin-create-conference-event.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ConferenceEvent } from 'src/app/models/conference-event.model';
import { ConferenceEventService } from 'src/app/services/conference-event.service';

@Component({
  selector: 'app-admin-create-conference-event',
  templateUrl: './admin-create-conference-event.component.html',
  styleUrls: ['./admin-create-conference-event.component.css'],
})
export class AdminCreateConferenceEventComponent implements OnInit {
  formData: ConferenceEvent = {
    EventName: '',
    OrganizerName: '',
    Category: '',
    Description: '',
    Location: '',
    StartDateTime: null,
    EndDateTime: null,
    Capacity: null
  };
  errors: any = {};
  errorMessage: string;
  successPopup: boolean = false;
  minDateTime: string;

  constructor(private conferenceEventService: ConferenceEventService, private router: Router) { }

  ngOnInit(): void {
    this.setMinDateTime();
  }

  setMinDateTime() {
    // Get current date and time and set it as the minimum selectable datetime
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // Adjust for timezone
    this.minDateTime = now.toISOString().slice(0, 16);
  }

  handleChange(event: any, field: string) {
    this.formData[field] = event.target.value;
  }

  handleStartDateChange() {
    // Ensure EndDateTime is not less than StartDateTime
    if (this.formData.EndDateTime && this.formData.EndDateTime < this.formData.StartDateTime) {
      this.formData.EndDateTime = this.formData.StartDateTime;
    }
  }

  handleEndDateChange() {
    // Just for debugging or additional logic if needed
    console.log('End Date Updated:', this.formData.EndDateTime);
  }

  onSubmit(eventForm: NgForm) {
    if (eventForm.valid) {
      this.conferenceEventService.addConferenceEvent(this.formData).subscribe(
        (res) => {
          this.successPopup = true;
          console.log('Conference Event added successfully', res);
          eventForm.resetForm();
        },
        (err) => {
          if (err.status === 500 && err.error.message === 'Event with the same name already exists') {
            this.errorMessage = 'Conference Event with the same name already exists';
          } else {
            this.errors = err.error;
          }
          // this.errorMessage = err.message;
          console.error('Error adding event:', err);
        }
      );
    } else {
      this.errorMessage = 'All fields are required';
    }
  }

  handleSuccessMessage() {
    this.successPopup = false;
    this.errorMessage = '';
    this.formData = {
      EventName: '',
      OrganizerName: '',
      Category: '',
      Description: '',
      Location: '',
      StartDateTime: null,
      EndDateTime: null,
      Capacity: null
    };
  }
}
