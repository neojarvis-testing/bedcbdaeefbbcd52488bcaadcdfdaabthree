using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [Route("api")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly BookingService _bookingService;

        public BookingController(BookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("bookings")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetAllBookings()
        {
            var bookings = await _bookingService.GetAllBookings();
            return Ok(bookings);
        }

        [Authorize(Roles = "User")]

        [HttpGet("bookings/user/{userId}")]
        public async Task<ActionResult<Booking>> GetBookingsByUserId(int userId)
        {
            var booking = await _bookingService.GetBookingsByUserId(userId);
            if (booking == null)
                return NotFound(new { message = "Booking not found" });
            return Ok(booking);
        }

        [Authorize]
        [HttpPost("booking")]
        public async Task<ActionResult> AddBooking([FromBody] Booking booking)
        {
            try
            {
                var success = await _bookingService.AddBooking(booking);
                if (success)
                    return Ok(new { message = "Booking added successfully" });
                else
                    return StatusCode(500, new { message = "Failed to add booking" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("booking/{bookingId}")]
        public async Task<ActionResult> UpdateBooking(int bookingId, [FromBody] Booking booking)
        {
            try
            {
                var success = await _bookingService.UpdateBooking(bookingId, booking);
                if (success)
                    return Ok(new { message = "Booking updated successfully" });
                else
                    return NotFound(new { message = "Booking not found" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // [Authorize(Roles = "Admin")]
        [HttpDelete("booking/{bookingId}")]
        public async Task<ActionResult> DeleteBooking(int bookingId)
        {
            try
            {
                var success = await _bookingService.DeleteBooking(bookingId);
                if (success)
                    return Ok(new { message = "Booking deleted successfully" });
                else
                    return NotFound(new { message = "Booking not found" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
