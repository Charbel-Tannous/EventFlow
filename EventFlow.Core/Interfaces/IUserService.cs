using EventFlow.Entities.Entities;


namespace EventFlow.Core.Interfaces
{
    public interface IUserService
    {
        public Task<User?> GetUserAsync(int id);
    }
}
