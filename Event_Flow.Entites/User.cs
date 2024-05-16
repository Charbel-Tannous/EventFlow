using Microsoft.AspNetCore.Identity;

namespace EventFlow.Entities.Entities
{
    public class User : IdentityUser
    {
        public int UserId { get; set; }
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public string Phone { get; set; } = String.Empty;
        public string Password { get; set; } = String.Empty;
        //navigation properties
        public ICollection<Event> Events { get; set; }
    }

}
