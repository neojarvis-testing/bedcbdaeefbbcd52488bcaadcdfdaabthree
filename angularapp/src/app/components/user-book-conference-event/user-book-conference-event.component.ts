import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConferenceEventService } from 'src/app/services/conference-event.service';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';

@Component({
  selector: 'app-user-book-conference-event',
  templateUrl: './user-book-conference-event.component.html',
  styleUrls: ['./user-book-conference-event.component.css']
})
export class UserBookConferenceEventComponent implements OnInit {

  bookingForm: FormGroup;
  successPopup = false;
  errorMessage = "";
  today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private conferenceEventService: ConferenceEventService
  ) {
    this.bookingForm = this.fb.group({
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      occupation: ['', Validators.required],
      city: ['', Validators.required],
      proof: [null, Validators.required], // Proof file input
      additionalNotes: [''], // Optional notes
      bookingStatus: ['Pending'], // Default status
      bookingDate: [new Date().toISOString()], // Current date
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const formData = this.bookingForm.value;

      const requestObject: Booking = {
        BookingId: 0, // Assuming the backend generates the ID
        UserId: Number(localStorage.getItem('userId')),
        ConferenceEventId: Number(localStorage.getItem('eventId')),
        Gender: formData.gender,
        Age: formData.age,
        Occupation: formData.occupation,
        City: formData.city,
        Proof: formData.proof, // Base64-encoded file
        AdditionalNotes: formData.additionalNotes || '',
        BookingStatus: formData.bookingStatus,
        BookingDate: formData.bookingDate,
      };
console.log(requestObject,"asdg")
      this.conferenceEventService.addConferenceEventBooking(requestObject).subscribe(
        (response) => {
          console.log('Booking Successful:', response);
          this.successPopup = true;
        },
        (error) => {
          console.error('Error booking conference event:', error);
          this.errorMessage = 'Error booking conference event';
        }
      );
    } else {
      this.errorMessage = "All fields are required";
    }
  }

  handleFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.convertFileToBase64(file).then(
        (base64String) => {
          this.bookingForm.patchValue({
            proof: base64String, // Storing the base64 content in the form control
          });
        },
        (error) => {
          console.error('Error converting file to base64:', error);
        }
      );
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.router.navigate(['/user/view/conference-events']); // Redirect to conference events list
  }

  navigateBack(): void {
    this.router.navigate(['/user/view/conference-events']); // Navigate back to events listing
  }
}
