using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace EventFlow.Entities.Entities
{
    public class Event
    {
        public Guid EventId { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = String.Empty;
        public DateTime Date { get; set; } = DateTime.Now;
        public TimeSpan Time { get; set; } 
        public string Location { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;

        //navigation proprety
        [ForeignKey("User")]
        public string UserId { get; set; }
        public User User { get; set; }

        [ForeignKey("Category")]
        public Guid CategoryId { get; set; }
        [JsonIgnore]
        public Category Category { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
        public ICollection<Review> Reviews { get; set; }
    }
}
