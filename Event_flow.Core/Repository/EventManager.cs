using Event_flow.Core.Interfaces;
using Event_flow.Core.Mappers;
using Event_Flow.Data.Dats_access;
using Event_Flow.Entites.DTOs.Event;
using EventFlow.Entities.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_flow.Core.Repository
{
    public class EventManager : IEventManager
    {
        private readonly AppDbContext _ctx;
        private readonly UserManager<User> _userManager;

        public EventManager(AppDbContext ctx, UserManager<User> userManager)
        {
            _ctx = ctx;
            _userManager = userManager;
        }

        public async Task<Event> GetEvent(Guid id)
        {
            Event e = await _ctx.Events.Include(e=>e.Category).Include(e => e.Tickets).Include(e=>e.Reviews).FirstOrDefaultAsync(e => e.EventId == id);
            if(e == null)
            {
                return null;
            }
            return e;
        }

        public async Task<EventResponseDTO> CreateEvent(PostEventDTO eventDto, string uid)
        {
            var category = await _ctx.Category.FirstOrDefaultAsync(cat => cat.Name == eventDto.CategoryName);
            if (category == null)
            {
                var newCategory = new Category { Name = eventDto.CategoryName };
                await _ctx.Category.AddAsync(newCategory);
                await _ctx.SaveChangesAsync();
                category = newCategory; // Update the reference to the new category
            }

            // Map the DTO to an Event entity
            Event e = eventDto.FromRequestToEventEntity(uid, category.CategoryId);

            // Add the Event entity to the context and save changes to get the EventId
            _ctx.Events.Add(e);
            await _ctx.SaveChangesAsync();

            // Now that the Event entity has an ID, add the tickets related to the event
            foreach (var ticketDto in eventDto.Tickets)
            {
                Ticket t = ticketDto.FromTicketDTIOToTicketEntity(e.EventId);
                await _ctx.Ticket.AddAsync(t);
            }

            await _ctx.SaveChangesAsync();

            var tickets = eventDto.Tickets.Select(ticketDto => ticketDto.FromTicketDTIOToTicketEntity(e.EventId)).ToList(); // map to response


            // Return the response DTO with event details
            return new EventResponseDTO
            {
                EventId = e.EventId,
                Name = e.Name,
                CategoryName = category.Name,
                Location = e.Location,
                Description = e.Description,
                Date = e.Date,
                Time = e.Time,
                Tickets = tickets
            };
        }

        public async Task<List<EventResponseDTO>> GetAllEvent()
        {
            var events = await _ctx.Events
                                   .Include(e => e.Category)
                                   .Include(e => e.Tickets)
                                   .Include(e => e.Reviews)
                                   .ToListAsync();

            var eventResponseDTOs = events.Select(e => e.FromEntityToResponse()).ToList();

            return eventResponseDTOs;
        }


        public async Task<List<EventResponseDTO>> GetAllEventsByUserId(string uid)
        {
            var user = await _userManager.FindByIdAsync(uid); //check if user exist
            if(user == null)
            {
                return null;
            }
            var events = await _ctx.Events
                       .Include(e => e.Category)
                       .Include(e => e.Tickets)
                       .Include(e => e.Reviews)
                       .Where(e => e.UserId == uid)
                       .ToListAsync();

            var eventResponseDTOs = events.Select(e => e.FromEntityToResponse()).ToList();

            return eventResponseDTOs;
        }

        public async Task<bool> DeleteEventById(Guid id)
        {
            var _event = await GetEvent(id);
            if(_event == null)
            {
                return true; // event does not exist anyway
            }
            //tickets to delete:
            var ticketsToDelete = await _ctx.Ticket.Where(t=>t.EventId == id).ToListAsync();
            //review to delete:
            var reviewsToDelete = await _ctx.Reviews.Where(r=>r.EventId ==id).ToListAsync();
            if(ticketsToDelete.Any())
            {
                _ctx.Ticket.RemoveRange(ticketsToDelete);
            }
            if (reviewsToDelete.Any())
            {
                _ctx.Reviews.RemoveRange(reviewsToDelete);
            }
            _ctx.Events.Remove(_event); //remove event
            await _ctx.SaveChangesAsync();
            return true;
        }

        public async Task<bool> AddReviewToEvent(Guid id, ReviewDTO reviewDTO, string uid)
        {
            Event e = await GetEvent(id);
            if(e== null)
            {
                return false;
            }
            Review review = new Review
            {
                Text = reviewDTO.Text,
                EventId = id,
                UserId = uid
            };
            await _ctx.Reviews.AddAsync(review);
            await _ctx.SaveChangesAsync();
            return true;
        }
    }
}
