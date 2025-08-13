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
    public class ConferenceEventService
    {
        private readonly ApplicationDbContext _context;

        public ConferenceEventService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ConferenceEvent>> GetAllConferenceEvents()
        {
            return await _context.ConferenceEvents.ToListAsync();
        }

        public async Task<ConferenceEvent> GetConferenceEventById(int conferenceEventId)
        {
            return await _context.ConferenceEvents.FirstOrDefaultAsync(e => e.ConferenceEventId == conferenceEventId);
        }

        public async Task<bool> AddConferenceEvent(ConferenceEvent conferenceEvent)
        {
            if (_context.ConferenceEvents.Any(e => e.EventName == conferenceEvent.EventName))
            {
                throw new ConferenceEventException("Event with the same name already exists");
            }
            _context.ConferenceEvents.Add(conferenceEvent);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateConferenceEvent(int conferenceEventId, ConferenceEvent conferenceEvent)
        {
            var existingEvent = await _context.ConferenceEvents.FirstOrDefaultAsync(e => e.ConferenceEventId == conferenceEventId);

            if (existingEvent == null)
                return false;

            if (_context.ConferenceEvents.Any(e => e.EventName == conferenceEvent.EventName && e.ConferenceEventId != conferenceEventId))
            {
                throw new ConferenceEventException("Event with the same name already exists");
            }

            conferenceEvent.ConferenceEventId = conferenceEventId;
            _context.Entry(existingEvent).CurrentValues.SetValues(conferenceEvent);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteConferenceEvent(int conferenceEventId)
        {
            var conferenceEvent = await _context.ConferenceEvents.FirstOrDefaultAsync(e => e.ConferenceEventId == conferenceEventId);

            if (conferenceEvent == null)
                return false;

            if (_context.Bookings.Any(b => b.ConferenceEventId == conferenceEventId))
            {
                throw new ConferenceEventException("Conference event cannot be deleted, it is referenced in bookings");
            }

            _context.ConferenceEvents.Remove(conferenceEvent);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
