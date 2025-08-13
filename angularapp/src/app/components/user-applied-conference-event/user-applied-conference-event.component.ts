import { Component, OnInit } from '@angular/core';
import { ConferenceEventService } from 'src/app/services/conference-event.service';

@Component({
  selector: 'app-user-applied-conference-event',
  templateUrl: './user-applied-conference-event.component.html',
  styleUrls: ['./user-applied-conference-event.component.css']
})
export class UserAppliedConferenceEventComponent implements OnInit {
  showDeletePopup = false;
  bookingToDelete: any = null;
  bookings: any[] = [];
  filteredBookings: any[] = [];
  searchValue = '';
  sortValue = 0;
  page = 1;
  limit = 5;
  maxRecords = 1;
  showProofModal = false;
  proofSrc: any;

  constructor(private conferenceEventService: ConferenceEventService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const userId = Number(localStorage.getItem('userId'));
    this.conferenceEventService.getRegisteredEvents(userId).subscribe(
      (response: any) => {
        this.bookings = response;
        this.filteredBookings = response;
        this.maxRecords = response.length;
      },
      (error) => {
        console.error('Error fetching bookings:', error);
      }
    );
  }

  totalPages(): number {
    return Math.ceil(this.maxRecords / this.limit);
  }

  filterBookings(): void {
    const searchLower = this.searchValue.toLowerCase();
    this.filteredBookings = this.bookings.filter(booking =>
      booking.Occupation.toLowerCase().includes(searchLower)
    );
    this.maxRecords = this.filteredBookings.length;
  }

  toggleSort(order: number): void {
    this.sortValue = order;
    this.filteredBookings.sort((a, b) => {
      return order === 1
        ? new Date(a.BookingDate).getTime() - new Date(b.BookingDate).getTime()
        : new Date(b.BookingDate).getTime() - new Date(a.BookingDate).getTime();
    });
  }

  viewProof(proofBase64: string): void {
    this.proofSrc = proofBase64;
    this.showProofModal = true;
  }

  closeProofModal(): void {
    this.showProofModal = false;
    this.proofSrc = '';
  }

  handleDeleteClick(booking: any): void {
    this.bookingToDelete = booking;
    this.showDeletePopup = true;
  }

  handleConfirmDelete(): void {
    this.conferenceEventService.deleteConferenceEventBooking(this.bookingToDelete.BookingId).subscribe(
      () => {
        this.fetchData();
        this.closeDeletePopup();
      },
      (error) => console.error('Error deleting booking:', error)
    );
  }

  closeDeletePopup(): void {
    this.bookingToDelete = null;
    this.showDeletePopup = false;
  }
}
