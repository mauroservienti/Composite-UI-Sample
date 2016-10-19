using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace RegistryApi
{
	public class Startup
	{
		// This method gets called by a runtime.
		// Use this method to add services to the container
		public void ConfigureServices(IServiceCollection services)
		{
            services.AddMvc();

			services.AddSingleton(typeof(Shared.DataManager), c =>
			{
				var env = (IHostingEnvironment)c.GetService(typeof(IHostingEnvironment));
				return new Shared.DataManager(env.ContentRootPath);
			});
		}

		// Configure is called after ConfigureServices is called.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			app.Use(async (context, next) =>
		   {
			   context.Response.Headers.Append("Access-Control-Allow-Origin", "*");
			   context.Response.Headers.Add("Access-Control-Allow-Headers", new[] { "Content-Type, x-xsrf-token" });
			   await next();
		   });

			app.UseStaticFiles();
			// Add MVC to the request pipeline.
			app.UseMvc(routes =>
			{
				routes.MapRoute(
					name: "default",
					template: "{controller}/{action}/{id?}",
					defaults: new { controller = "Home", action = "Index" });
			});
		}
	}
}
