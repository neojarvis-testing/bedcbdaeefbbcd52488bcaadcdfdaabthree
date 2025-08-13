export interface Booking {
  BookingId: number;
  UserId: number;
  ConferenceEventId: number;
  BookingStatus: string; // e.g., "Confirmed", "Pending", "Cancelled"
  BookingDate: Date;
  Gender: string;
  Age: number;
  Occupation: string;
  City: string;
  Proof: string; // e.g., confirmation number or document
  AdditionalNotes?: string; // Optional field
}
