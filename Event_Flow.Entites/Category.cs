using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventFlow.Entities.Entities
{
    public class Category
    {
        public Guid CategoryId { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = String.Empty;
        public ICollection<Event> Events { get; set; }
    }
}
