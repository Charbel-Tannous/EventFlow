using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Event_Flow.Entites.DTOs.Event
{
    public class TicketDTO
    {
        [Required]
        public string Section { get; set; }
        [Required]
        public int Price { get; set; }
    }
}
