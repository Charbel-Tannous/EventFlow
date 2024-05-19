using Event_Flow.Entites.DTOs.Event;
using EventFlow.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_flow.Core.Interfaces
{
    public interface IEventManager
    {
        public Task<EventResponseDTO> CreateEvent(PostEventDTO eventDto, string uid);
        public Task<Event> GetEvent(Guid uid);
        public Task<List<EventResponseDTO>> GetAllEvent();
        public Task<List<EventResponseDTO>> GetAllEventsByUserId(string uid);
        public Task<bool> DeleteEventById(Guid id);
        public Task<bool> AddReviewToEvent(Guid id, ReviewDTO reviewDTO, string uid);
    }
}
