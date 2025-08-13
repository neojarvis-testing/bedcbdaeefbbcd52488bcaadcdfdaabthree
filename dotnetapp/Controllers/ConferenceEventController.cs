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
    public class ConferenceEventController : ControllerBase
    {
        private readonly ConferenceEventService _conferenceEventService;

        public ConferenceEventController(ConferenceEventService conferenceEventService)
        {
            _conferenceEventService = conferenceEventService;
        }

        [HttpGet("conference-events")]
        public async Task<ActionResult<IEnumerable<ConferenceEvent>>> GetAllConferenceEvents()
        {
            var events = await _conferenceEventService.GetAllConferenceEvents();
            return Ok(events);
        }

        [HttpGet("conference-event/{conferenceEventId}")]
        public async Task<ActionResult<ConferenceEvent>> GetConferenceEventById(int conferenceEventId)
        {
            var eventDetails = await _conferenceEventService.GetConferenceEventById(conferenceEventId);
            if (eventDetails == null)
                return NotFound(new { message = "Conference event not found" });
            return Ok(eventDetails);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("conference-event")]
        public async Task<ActionResult> AddConferenceEvent([FromBody] ConferenceEvent conferenceEvent)
        {
            try
            {
                var success = await _conferenceEventService.AddConferenceEvent(conferenceEvent);
                if (success)
                    return Ok(new { message = "Conference event added successfully" });
                else
                    return StatusCode(500, new { message = "Failed to add conference event" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("conference-event/{conferenceEventId}")]
        public async Task<ActionResult> UpdateConferenceEvent(int conferenceEventId, [FromBody] ConferenceEvent conferenceEvent)
        {
            try
            {
                var success = await _conferenceEventService.UpdateConferenceEvent(conferenceEventId, conferenceEvent);
                if (success)
                    return Ok(new { message = "Conference event updated successfully" });
                else
                    return NotFound(new { message = "Conference event not found" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("conference-event/{conferenceEventId}")]
        public async Task<ActionResult> DeleteConferenceEvent(int conferenceEventId)
        {
            try
            {
                var success = await _conferenceEventService.DeleteConferenceEvent(conferenceEventId);
                if (success)
                    return Ok(new { message = "Conference event deleted successfully" });
                else
                    return NotFound(new { message = "Conference event not found" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }

}