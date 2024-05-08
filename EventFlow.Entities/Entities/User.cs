using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventFlow.Entities.Entities
{
    public class User 
    {
        public int UserId { get; set; }
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string Phone { get; set; } = String.Empty;
        public string Password { get; set; } = String.Empty;
        //navigation properties
        public ICollection<Event> Events { get; set; }
    }

}
