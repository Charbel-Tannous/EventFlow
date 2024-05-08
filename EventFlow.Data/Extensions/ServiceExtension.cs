using EventFlow.Core.Interfaces;
using EventFlow.Data.Data_access;
using EventFlow.Data.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventFlow.Data.Extensions
{
    public static class ServiceExtension
    {
        public static IServiceCollection addInfrustructure(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<AppDbContext>(options => options.UseSqlServer(config.GetConnectionString("Default"),
                b => b.MigrationsAssembly(typeof(ServiceExtension).Assembly.FullName)), ServiceLifetime.Scoped);
            services.AddScoped<IUserRepository, UserRepository>();
            return services;
        }
    }
}
