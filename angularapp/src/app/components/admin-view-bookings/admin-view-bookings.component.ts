import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';
import { ConferenceEventService } from 'src/app/services/conference-event.service';

@Component({
  selector: 'app-admin-view-bookings',
  templateUrl: './admin-view-bookings.component.html',
  styleUrls: ['./admin-view-bookings.component.css']
})
export class AdminViewBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  searchValue = '';
  statusFilter = 'All';
  page = 1;
  pageSize = 5;
  proofSrc: string | null = null;
  showProofModal = false;
  showDeletePopup = false;
  bookingToDelete: any = null;

  constructor(private conferenceEventService: ConferenceEventService, private router: Router) { }

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.conferenceEventService.getAllConferenceEventBookings().subscribe(
      (response) => {
        this.bookings = response.map((booking, index) => ({
          ...booking,
          SNo: index + 1, // Adding serial number
          Gender: booking.Gender || 'NA',
          City: booking.City || 'NA',
          AdditionalNotes: booking.AdditionalNotes || 'NA'
        }));
        this.filteredBookings = [...this.bookings];
      },
      (error) => {
        console.error('Error fetching bookings:', error);
      }
    );
  }

  navigateToChart() {
    const navigationExtras: NavigationExtras = {
      state: { bookings: this.filteredBookings } // Pass applications
    };
    console.log(navigationExtras,"navgiardyt");
    localStorage.setItem('bookingsData', JSON.stringify(this.filteredBookings)); // Store in localStorage
    this.router.navigate(['/admin/view/bookings/piechart'], navigationExtras);
  }

  // handleSearchChange(event: any): void {
  //   this.searchValue = event.target.value.toLowerCase();
  //   // this.filteredBookings = this.bookings.filter(booking =>
  //   //   booking.ConferenceEvent.EventName.toLowerCase().includes(this.searchValue)
  //   // );
  // }

  handleFilterChange(event: any): void {
    this.statusFilter = event.target.value;
    this.filteredBookings = this.statusFilter === 'All'
      ? [...this.bookings]
      : this.bookings.filter(booking => booking.BookingStatus === this.statusFilter);
  }

  viewProof(proofBase64: string): void {
    this.proofSrc = proofBase64;
    this.showProofModal = true;
  }

  closeProofModal(): void {
    this.showProofModal = false;
    this.proofSrc = null;
  }

  handleDeleteClick(booking: Booking): void {
    this.bookingToDelete = booking;
    this.showDeletePopup = true;
    // if (confirm('Are you sure you want to delete this booking?')) {
    //   this.conferenceEventService.deleteConferenceEventBooking(booking.BookingId).subscribe(
    //     () => {
    //       this.fetchBookings();
    //     },
    //     (error) => {
    //       console.error('Error deleting booking:', error);
    //     }
    //   );
    // }
  }

  handleConfirmDelete(): void {
    this.conferenceEventService.deleteConferenceEventBooking(this.bookingToDelete.BookingId).subscribe(
      () => {
        this.fetchBookings();
        this.closeDeletePopup();
      },
      (error) => console.error('Error deleting booking:', error)
    );
  }

  closeDeletePopup(): void {
    this.bookingToDelete = null;
    this.showDeletePopup = false;
  }

  onStatusChange(booking: Booking) {
    console.log(booking, "defg")
    this.conferenceEventService.updateConferenceEventBooking(booking.BookingId, booking).subscribe(
      response => {
        this.fetchBookings();
        console.log('Status updated successfully', response);
      },
      error => {
        console.error('Error updating status', error);
      }
    );
  }
}
