using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Exceptions;

namespace dotnetapp.Services
{
    public class BookingService
    {
        private readonly ApplicationDbContext _context;

        public BookingService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Booking>> GetAllBookings()
        {
            return await _context.Bookings.Include(r => r.ConferenceEvent).Include(r => r.User).ToListAsync();
        }

        public async Task<IEnumerable<Booking>> GetBookingsByUserId(int userId)
        {
            return await _context.Bookings.Include(b => b.ConferenceEvent).Where(la => la.UserId == userId).ToListAsync();
        }

        public async Task<bool> AddBooking(Booking booking)
        {
            var conferenceEvent = await _context.ConferenceEvents.FindAsync(booking.ConferenceEventId);

            if (conferenceEvent == null)
            {
                throw new ConferenceEventException("Conference event not found.");
            }

            if (conferenceEvent.Capacity <= 0)
            {
                throw new ConferenceEventException("No more seats available for this event.");
            }

            if (_context.Bookings.Any(b => b.ConferenceEventId == booking.ConferenceEventId && b.UserId == booking.UserId))
            {
                throw new ConferenceEventException("Booking with the same reference already exists");
            }
            _context.Bookings.Add(booking);
            // Decrease capacity by 1
            conferenceEvent.Capacity -= 1;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateBooking(int bookingId, Booking booking)
        {
            var existingBooking = await _context.Bookings.FirstOrDefaultAsync(b => b.BookingId == bookingId);
            if (existingBooking == null)
                return false;

            booking.BookingId = bookingId;
            _context.Entry(existingBooking).CurrentValues.SetValues(booking);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteBooking(int bookingId)
        {
            var booking = await _context.Bookings.FirstOrDefaultAsync(b => b.BookingId == bookingId);
            if (booking == null)
                return false;
            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
