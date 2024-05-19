using Microsoft.AspNetCore.Identity;

namespace EventFlow.Entities.Entities
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        //navigation properties
        public ICollection<Event> Events { get; set; }
        public ICollection<Review> Reviews { get; set; }
    }
}