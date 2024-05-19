using Event_flow.Core.Interfaces;
using Event_Flow.Entites.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Event_Flow.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthManager _authManager;

        public AuthController(IAuthManager authManager)
        {
            _authManager = authManager;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> PostRegister([FromBody] RegisterRequestDTO registerDTO) 
        {
            var errors = await _authManager.Register(registerDTO);

            if (errors.Any())
            {
                foreach (var error in errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return BadRequest(ModelState);
            }

            return Created();
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> PostLogin([FromBody] LoginRequestDTO loginDTO)
        {
            var authResponse = await _authManager.Login(loginDTO);

            if (authResponse == null)
            {
                return Unauthorized();
            }

            return Ok(authResponse);
        }
    }
}
