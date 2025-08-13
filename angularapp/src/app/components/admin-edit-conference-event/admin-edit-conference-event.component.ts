import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConferenceEventService } from 'src/app/services/conference-event.service';
import { ConferenceEvent } from 'src/app/models/conference-event.model';

@Component({
  selector: 'app-admin-edit-conference-event',
  templateUrl: './admin-edit-conference-event.component.html',
  styleUrls: ['./admin-edit-conference-event.component.css']
})
export class AdminEditConferenceEventComponent implements OnInit {
  id: number;
  errorMessage: string = '';
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
  successPopup: boolean;
  minDate: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private conferenceEventService: ConferenceEventService
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getConferenceEventById();
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  getConferenceEventById() {
    this.conferenceEventService.getConferenceEventById(this.id).subscribe(
      (response) => {
        console.log('Conference Event details:', response);
        this.formData = {
          EventName: response.EventName,
          OrganizerName: response.OrganizerName,
          Category: response.Category,
          Description: response.Description,
          Location: response.Location,
          StartDateTime: response.StartDateTime,
          EndDateTime: response.EndDateTime,
          Capacity: response.Capacity
        };
      },
      (error) => {
        console.error('Error fetching conference event details:', error);
        this.router.navigate(['/error']);
      }
    );
  }

  handleChange(event: any, field: string) {
    this.formData[field] = event.target.value;
    this.errors[field] = ''; // Clear error when the user makes a change
  }

  handleUpdateConferenceEvent(conferenceForm: NgForm) {
    if (conferenceForm.valid) {
      console.log(this.formData)
      this.conferenceEventService.updateConferenceEvent(this.id, this.formData).subscribe(
        (response) => {
          console.log('Conference event updated successfully', response);
          this.successPopup = true;
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error updating conference event:', error);
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  handleOkClick() {
    this.successPopup = false;
    this.router.navigate(['/admin/view/conference-events']);
  }

  navigateToDashboard() {
    this.router.navigate(['/admin/view/conference-events']);
  }
}
