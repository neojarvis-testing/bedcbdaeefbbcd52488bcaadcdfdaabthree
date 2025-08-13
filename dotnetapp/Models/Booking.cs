using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class Booking
    {
        public int BookingId { get; set; }

        [Required(ErrorMessage = "User ID is required")]
        public int UserId { get; set; }
        public User? User { get; set; }

        [Required(ErrorMessage = "ConferenceEventId is required.")]
        public int ConferenceEventId { get; set; }
        public ConferenceEvent? ConferenceEvent { get; set; }


        [Required(ErrorMessage = "Booking status is required.")]
        public string BookingStatus { get; set; } // e.g., "Confirmed", "Pending", "Cancelled"

        [Required(ErrorMessage = "Booking date is required.")]
        public DateTime BookingDate { get; set; }

        [StringLength(300, ErrorMessage = "Notes cannot exceed 300 characters.")]
        public string? AdditionalNotes { get; set; }

        [Required(ErrorMessage = "Proof of booking is required.")]
        public string Proof { get; set; } // e.g., confirmation number or document

        [Required(ErrorMessage = "Gender is required.")]
        [StringLength(10, ErrorMessage = "Gender cannot exceed 10 characters.")]
        public string Gender { get; set; }

        [Required(ErrorMessage = "Age is required.")]
        [Range(1, 120, ErrorMessage = "Age must be between 1 and 120.")]
        public int Age { get; set; }

        [StringLength(200, ErrorMessage = "Occupation cannot exceed 200 characters.")]
        public string Occupation { get; set; }

        [StringLength(200, ErrorMessage = "City cannot exceed 200 characters.")]
        public string City { get; set; }
    }
}