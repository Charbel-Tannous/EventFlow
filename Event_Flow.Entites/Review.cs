using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace EventFlow.Entities.Entities
{
    public class Review
    {
        public Guid ReviewId { get; set; } = Guid.NewGuid();
        public string Text { get; set; } = String.Empty;
        public DateTime Date { get; set; } = DateTime.Now;
        [ForeignKey("User")]
        public string UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }

        [ForeignKey("Event")]
        public Guid EventId { get; set; }
        [JsonIgnore]
        public Event Event { get; set; }
    }
}
