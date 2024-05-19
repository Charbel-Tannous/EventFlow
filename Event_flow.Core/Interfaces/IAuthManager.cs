using Event_Flow.Entites.DTOs;
using Microsoft.AspNetCore.Identity;

namespace Event_flow.Core.Interfaces
{
    public interface IAuthManager
    {
        Task<IEnumerable<IdentityError>> Register(RegisterRequestDTO registerDTO);
        Task<LoginResponseDto> Login(LoginRequestDTO loginDTO);
    }
}
