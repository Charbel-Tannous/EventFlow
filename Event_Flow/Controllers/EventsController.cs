using Event_flow.Core.Interfaces;
using Event_flow.Core.Mappers;
using Event_Flow.Entites.DTOs.Event;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Event_Flow.API.Controllers
{
    [Route("api/event")]
    [ApiController]
    [Authorize]
    public class EventsController : ControllerBase
    {
        private readonly IEventManager _eventManager;
        public EventsController(IEventManager eventManager)
        {
            _eventManager = eventManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEvents()
        {
            var events = await _eventManager.GetAllEvent();
            return Ok(events);
        }

        [HttpGet]
        [Route("user")]
        public async Task<IActionResult> GetEventsByUserID([FromRoute] Guid userId) 
        {
            HttpContext.Items.TryGetValue("Uid", out var uid);
            if (uid == null)
            {
                return BadRequest("User ID not found in the token");
            }

            var res = await _eventManager.GetAllEventsByUserId(uid.ToString());
            if (res == null)
            {
                return NotFound("User Not Active");
            }
            return Ok(res);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetEventById([FromRoute] Guid id)
        {
            var res = await _eventManager.GetEvent(id);
            if (res == null)
            {
                return NotFound("No event found for mentioned ID");
            }
            return Ok(res.FromEntityToResponse());
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateEvent([FromBody] PostEventDTO eventDTO)
        {
            HttpContext.Items.TryGetValue("Uid", out var uid);
            if (uid == null)
            {
                return BadRequest("User ID not found in the token");
            }

            var eventResponse = await _eventManager.CreateEvent(eventDTO, uid.ToString());

            return CreatedAtAction(nameof(GetEventById), new { id = eventResponse.EventId }, eventResponse);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteEventById([FromRoute] Guid id) 
        {
            bool result = await _eventManager.DeleteEventById(id);
            if (!result)
            {
                return NotFound("Event ID not found!");
            }
            return NoContent();
        }

        [HttpPost]
        [Route("review/{id}")]
        public async Task<IActionResult> ReviewEvent([FromRoute] Guid id, [FromBody] ReviewDTO review)
        {
            HttpContext.Items.TryGetValue("Uid", out var uid);
            if (uid == null)
            {
                return BadRequest("User ID not found in the token");
            }
            bool result = await _eventManager.AddReviewToEvent(id, review, uid.ToString());
            if (!result)
            {
                return NotFound("Event Not Found");
            }
            return NoContent();
        }
    }
}
