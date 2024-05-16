using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventFlow.Entities.Entities
{
    public class Review
    {
        public int ReviewId { get; set; }
        public string Text { get; set; } = String.Empty;
        public DateTime Date { get; set; } = DateTime.Now;
        public TimeSpan Time { get; set; }
        public int UserId { get; set; }
        public int EventId { get; set; }

        public Event Event { get; set; }
    }
}
