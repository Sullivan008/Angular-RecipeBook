﻿using System.Linq;
using System.Reflection;
using Application.DataAccessLayer.Context;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Web.Core.Configurations
{
    public static class CoreConfigurations
    {
        public static IServiceCollection ConfigureReadOnlyDbContext(this IServiceCollection services)
        {
            services.AddScoped<RecipeBookReadOnlyDbContext>();

            return services;
        }

        public static IServiceCollection ConfigureMediatR(this IServiceCollection services)
        {
            Assembly bllAssembly = typeof(Startup).Assembly.GetReferencedAssemblies()
                .Where(x => x.Name == "Application.BusinessLogicLayer")
                .Select(Assembly.Load)
                .Single();

            services.AddMediatR(bllAssembly);

            return services;
        }
    }
}