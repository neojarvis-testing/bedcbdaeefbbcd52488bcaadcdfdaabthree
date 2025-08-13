import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ConferenceEventService } from 'src/app/services/conference-event.service';
import { ConferenceEvent } from 'src/app/models/conference-event.model';

@Component({
  selector: 'app-user-view-conference-event',
  templateUrl: './user-view-conference-event.component.html',
  styleUrls: ['./user-view-conference-event.component.css']
})
export class UserViewConferenceEventComponent implements OnInit {

  availableEvents: ConferenceEvent[] = [];
  filteredEvents: ConferenceEvent[] = [];
  searchValue: string = '';
  page: number = 1;
  limit: number = 5;
  registeredEvents: ConferenceEvent[] = [];
  searchField: string = '';
  maxRecords = 1;
  constructor(private router: Router, private eventService: ConferenceEventService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const userId = Number(localStorage.getItem('userId'));

    forkJoin({
      registeredEvents: this.eventService.getRegisteredEvents(userId),
      allEvents: this.eventService.getAllConferenceEvents()
    }).subscribe(
      ({ registeredEvents, allEvents }) => {
        this.registeredEvents = registeredEvents;
        this.availableEvents = allEvents.map((event: any) => ({
          ConferenceEventId: event.ConferenceEventId,
          EventName: event.EventName,
          OrganizerName: event.OrganizerName,
          Category: event.Category,
          Description: event.Description,
          Location: event.Location,
          StartDateTime: event.StartDateTime,
          EndDateTime: event.EndDateTime,
          Capacity: event.Capacity
        }));
        this.filteredEvents = this.availableEvents;
        this.maxRecords = allEvents.length;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  handleSearchChange(searchValue: string): void {
    this.searchField = searchValue;
    this.filteredEvents = this.filterEvents(searchValue);
  }

  filterEvents(search: string) {
    const searchLower = search.toLowerCase();
    if (searchLower === '') return this.availableEvents;
    return this.availableEvents.filter(
      (event) =>
        event.EventName.toLowerCase().includes(searchLower) ||
        event.OrganizerName.toLowerCase().includes(searchLower) ||
        event.Location.toLowerCase().includes(searchLower)
    );
  }

  handleRegisterClick(event: ConferenceEvent) {
    const isEventRegistered = this.isEventRegistered(event);

    if (isEventRegistered) {
      alert('You are already registered for this event.');
    } else {
      this.registeredEvents.push(event);
      localStorage.setItem('eventId', event.ConferenceEventId?.toString() || '');
      this.router.navigate(['/user/book-conference-event']);
    }
  }

  isEventRegistered(event: ConferenceEvent): boolean {
    return this.registeredEvents.some(
      (registeredEvent) => registeredEvent.ConferenceEventId === event.ConferenceEventId
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isEventExpired(event: ConferenceEvent): boolean {
    const currentDate = new Date();
    return new Date(event.EndDateTime) < currentDate;
  }

  totalPages(): number {
    return Math.ceil(this.maxRecords / this.limit);
  }
}
