import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/apiconfig';
import { Observable } from 'rxjs';
import { ConferenceEvent } from '../models/conference-event.model';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class ConferenceEventService {

  public apiUrl = apiUrl; // Update with your API URL

  constructor(private http: HttpClient) { }

  getAllConferenceEvents(): Observable<ConferenceEvent[]> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<ConferenceEvent[]>(`${this.apiUrl}/api/conference-events`, { headers });
  }

  addConferenceEvent(requestObject: ConferenceEvent): Observable<ConferenceEvent> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post<ConferenceEvent>(`${this.apiUrl}/api/conference-event`, requestObject, { headers });
  }

  deleteConferenceEvent(conferenceEventId: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete<void>(`${this.apiUrl}/api/conference-event/${conferenceEventId}`, { headers });
  }

  getConferenceEventById(id: number): Observable<ConferenceEvent> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<ConferenceEvent>(`${this.apiUrl}/api/conference-event/${id}`, { headers });
  }

  updateConferenceEvent(id: number, requestObject: ConferenceEvent): Observable<ConferenceEvent> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.put<ConferenceEvent>(`${this.apiUrl}/api/conference-event/${id}`, requestObject, { headers });
  }

  getRegisteredEvents(userId: number): Observable<ConferenceEvent[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<ConferenceEvent[]>(`${this.apiUrl}/api/bookings/user/${userId}`, { headers });
  }

  addConferenceEventBooking(data: Booking): Observable<Booking> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post<Booking>(`${this.apiUrl}/api/booking`, data, { headers });
  }

  deleteConferenceEventBooking(internshipId: number): Observable<void> {
    console.log('deleteinternshipId', internshipId);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete<void>(`${this.apiUrl}/api/booking/${internshipId}`, { headers });
  }

  getAllConferenceEventBookings(): Observable<Booking[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<Booking[]>(`${this.apiUrl}/api/bookings`, { headers });
  }

  updateConferenceEventBooking(id: number, booking: Booking): Observable<Booking> {
    console.log('bookingId', id);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.put<Booking>(`${this.apiUrl}/api/booking/${id}`, booking, { headers });
  }


}
