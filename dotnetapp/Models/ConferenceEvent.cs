using System;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class ConferenceEvent
    {
        public int ConferenceEventId { get; set; }

        [Required(ErrorMessage = "Event name is required.")]
        [StringLength(150, MinimumLength = 3, ErrorMessage = "Event name must be between 3 and 150 characters.")]
        public string EventName { get; set; }

        [Required(ErrorMessage = "Organizer name is required.")]
        [StringLength(100)]
        public string OrganizerName { get; set; }

        [Required(ErrorMessage = "Category is required.")]
        [StringLength(50)]
        public string Category { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Location is required.")]
        [StringLength(200)]
        public string Location { get; set; }

        [Required(ErrorMessage = "Start date and time are required.")]
        public DateTime StartDateTime { get; set; }

        [Required(ErrorMessage = "End date and time are required.")]
        public DateTime EndDateTime { get; set; }

        [Range(1, 1000, ErrorMessage = "Capacity must be between 1 and 1000.")]
        public int Capacity { get; set; }


    }
}
