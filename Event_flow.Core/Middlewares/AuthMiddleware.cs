using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Event_flow.Core.Middlewares
{
    public class AuthMiddleware
    {
        private readonly RequestDelegate _next;

        public AuthMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.User.Identity.IsAuthenticated)
            {

                    var email = context.User.FindFirstValue(JwtRegisteredClaimNames.Email);
                    var jti = context.User.FindFirstValue(JwtRegisteredClaimNames.Jti);
                    var sub = context.User.FindFirstValue(JwtRegisteredClaimNames.Sub);
                    var uid = context.User.FindFirstValue("uid");

                        context.Items["Email"] = email;
                        context.Items["Jti"] = jti;
                        context.Items["Sub"] = sub;
                        context.Items["Uid"] = uid;
                    
                }


            await _next(context);
        }
    }
}
