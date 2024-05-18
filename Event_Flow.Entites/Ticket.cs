using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace EventFlow.Entities.Entities
{
    public class Ticket
    {
        public Guid TicketId { get; set; } = Guid.NewGuid();
        public string Section { get; set; } = String.Empty;
        public int Price { get; set; }

        //navigation properties
        [ForeignKey("Even")]
        public Guid EventId { get; set; }
        [JsonIgnore]
        public Event Event { get; set; }
    }
}
