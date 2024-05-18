using Event_Flow.Entites.DTOs.Event;
using EventFlow.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_flow.Core.Mappers
{
    public static class EventMapper
    {
        public static Event FromRequestToEventEntity(this PostEventDTO request, string userId ,Guid category_id)
        {
            return new Event
            {
                UserId = userId,
                CategoryId = category_id,
                Name = request.Name,
                Description = request.Description,
                Location = request.Location,
                Time = request.Time,
                Date = request.Date
            };
        }

        public static EventResponseDTO FromEntityToResponse(this Event e)
        {
            return new EventResponseDTO
            {
                EventId = e.EventId,
                Name = e.Name,
                Date = e.Date,
                Time = e.Time,
                Location = e.Location,
                Description = e.Description,
                Tickets = e.Tickets,
                CategoryName = e.Category.Name,
                Reviews = e.Reviews
            };
        }

        public static Ticket FromTicketDTIOToTicketEntity(this TicketDTO ticketDTO, Guid EventId)
        {
            return new Ticket
            {
                Price = ticketDTO.Price,
                Section = ticketDTO.Section,
                EventId = EventId
            };
        }

        public static TicketDTO FromTicketEntityToDTO(this Ticket ticket)
        {
            return new TicketDTO
            {
                Price = ticket.Price,
                Section = ticket.Section,
            };
        }
    }
}
