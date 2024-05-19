using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Event_flow.Core.Interfaces;
using EventFlow.Entities.Entities;
using Event_Flow.Entites.DTOs;
using Event_flow.Core.Mappers;
using Microsoft.Extensions.Logging;

namespace Event_flow.Core.Repository
{
    public class AuthManager : IAuthManager
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthManager> _logger;

        public AuthManager(UserManager<User> user, IConfiguration configuration, ILogger<AuthManager> logger)
        {
            _userManager = user;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<IEnumerable<IdentityError>> Register(RegisterRequestDTO registerDTO)
        {
            var user = registerDTO.RequestToUserEntity();

            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            return result.Errors;
        }
        public async Task<LoginResponseDto> Login(LoginRequestDTO loginDTO)
        {
            User user = await _userManager.FindByEmailAsync(loginDTO.Email);
            if(user == null) {
                return null;
            }
            bool isValid = await _userManager.CheckPasswordAsync(user, loginDTO.Password); 
            if(!isValid)
            {
                return null;
            }
            var token = await GenerateToken(user);
            return new LoginResponseDto
            {
                Token = token.ToString()
            };
        }

        private async Task<string> GenerateToken(User user)
        {
            _logger.LogInformation("------------------------------I am trying to debug--------------------------------");
            _logger.LogInformation(_configuration["JwtSettings:Key"]);
            // Retrieve the security key from configuration
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]));

            // Create signing credentials using the security key and HMAC SHA256 algorithm
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // Fetch user claims asynchronously
            var userClaims = await _userManager.GetClaimsAsync(user);

            // Define the standard JWT claims and include additional custom claims
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id)
            }.Union(userClaims);

            // Create the token descriptor with issuer, audience, claims, expiration, and signing credentials
            var tokenDescriptor = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["JwtSettings:DurationInMinutes"])),
                signingCredentials: credentials
            );

            // Generate the JWT token and return it as a string
            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }
}
