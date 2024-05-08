using EventFlow.Core.Interfaces;
using EventFlow.Data.Data_access;
using EventFlow.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventFlow.Data.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User?> getUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }
    }
}
