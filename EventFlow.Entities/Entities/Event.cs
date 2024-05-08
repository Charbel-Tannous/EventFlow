using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventFlow.Entities.Entities
{
    public class Event
    {
        public int EventId { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; } = String.Empty;
        public DateTime Date { get; set; } = DateTime.Now;
        public TimeSpan Time { get; set; } 
        public string Location { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        //navigation proprety
        public User User { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public ICollection<Category> Categories { get; set; }
    }
}
