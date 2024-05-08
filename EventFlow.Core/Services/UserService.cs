using EventFlow.Core.Interfaces;
using EventFlow.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventFlow.Core.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        public UserService(IUserRepository repo) {
            userRepository = repo;
        }

        public Task<User?> GetUserAsync(int id) {
            return userRepository.getUserByIdAsync(id);
        }
    }
}
