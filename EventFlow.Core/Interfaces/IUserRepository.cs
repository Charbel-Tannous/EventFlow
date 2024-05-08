using EventFlow.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventFlow.Core.Interfaces
{
    public interface IUserRepository
    {
        public Task<User?> getUserByIdAsync(int id);
    }
}
