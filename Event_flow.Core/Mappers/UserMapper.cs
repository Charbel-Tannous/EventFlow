using Event_Flow.Entites.DTOs;
using EventFlow.Entities.Entities;

namespace Event_flow.Core.Mappers
{
    public static class UserMapper
    {
        public static User RequestToUserEntity(this RegisterRequestDTO registerDto)
        {
            return new User
            {
                UserName = registerDto.FirstName + registerDto.LastName,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                PhoneNumber = registerDto.Phone,
                Email = registerDto.Email
            };
        }
    }
}
