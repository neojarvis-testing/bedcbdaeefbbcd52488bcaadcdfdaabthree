import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConferenceEventService } from '../../services/conference-event.service';
import { ConferenceEvent } from '../../models/conference-event.model';

@Component({
  selector: 'app-admin-view-conference-event',
  templateUrl: './admin-view-conference-event.component.html',
  styleUrls: ['./admin-view-conference-event.component.css']
})
export class AdminViewConferenceEventComponent implements OnInit {
  conferenceEvents: ConferenceEvent[] = [];
  showDeletePopup = false;
  eventToDelete: number | null = null;
  searchValue = '';
  page: number = 1;
  limit = 5;
  maxRecords = 1;
  totalPages = 1;
  status: string = ''; // For handling loading state
  allConferenceEvents: ConferenceEvent[] = []; // Stores full list for filtering
  errorMessage: string = '';

  constructor(private router: Router, private conferenceEventService: ConferenceEventService) {}

  ngOnInit(): void {
    this.fetchConferenceEvents();
  }

  fetchConferenceEvents() {
    this.status = 'loading';
    this.conferenceEventService.getAllConferenceEvents().subscribe(
      (data: ConferenceEvent[]) => {
        this.conferenceEvents = data;
        this.allConferenceEvents = data;
        this.maxRecords = data.length;
        this.totalPages = Math.ceil(this.maxRecords / this.limit);
        this.status = '';
      },
      (error) => {
        console.error('Error fetching conference events:', error);
        this.status = 'error';
      }
    );
  }

  handleDeleteClick(eventId: number) {
    this.eventToDelete = eventId;
    this.showDeletePopup = true;
  }

  navigateToEditEvent(eventId: number) {
    this.router.navigate(['/admin/edit-conference-event', eventId]);
  }

  handleConfirmDelete() {
    if (this.eventToDelete) {
      this.conferenceEventService.deleteConferenceEvent(this.eventToDelete).subscribe(
        () => {
          this.closeDeletePopup();
          this.fetchConferenceEvents();
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error deleting event:', error);
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }

  closeDeletePopup() {
    this.eventToDelete = null;
    this.showDeletePopup = false;
    this.errorMessage = '';
  }

  handleSearchChange(searchValue: string): void {
    this.searchValue = searchValue.toLowerCase();
    this.conferenceEvents = searchValue
      ? this.allConferenceEvents.filter(
          (event) =>
            event.EventName.toLowerCase().includes(this.searchValue) ||
            event.OrganizerName.toLowerCase().includes(this.searchValue) ||
            event.Location.toLowerCase().includes(this.searchValue)
        )
      : this.allConferenceEvents;
  }

  
}
