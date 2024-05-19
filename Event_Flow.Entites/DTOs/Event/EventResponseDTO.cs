using EventFlow.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_Flow.Entites.DTOs.Event
{
    public class EventResponseDTO
    {
        public Guid EventId { get; set; }
        public string Name { get; set; } = String.Empty;
        public DateTime Date { get; set; } = DateTime.Now;
        public TimeSpan Time { get; set; }
        public string Location { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        public string CategoryName {  get; set; } = String.Empty;

        public ICollection<Review> Reviews { get; set; }
        public ICollection<Ticket> Tickets { get; set; }

    }
}
