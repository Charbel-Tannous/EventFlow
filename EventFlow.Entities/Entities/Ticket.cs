using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventFlow.Entities.Entities
{
    public class Ticket
    {
        public int TicketId { get; set; }
        public int UserId { get; set; }
        public int EventId { get; set; }
        public string Section { get; set; } = String.Empty;
        public int Price { get; set; }

        //navigation properties
        public Event Event { get; set; }
    }
}
