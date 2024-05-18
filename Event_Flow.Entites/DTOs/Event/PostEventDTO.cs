using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_Flow.Entites.DTOs.Event
{
    public class PostEventDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string CategoryName { get; set; }
        [Required]
        public string Location { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public TimeSpan Time { get; set; }
        [Required]
        public List<TicketDTO> Tickets { get; set; }
    }
}
