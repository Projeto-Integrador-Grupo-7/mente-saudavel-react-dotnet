using MenteSaudavel.Server._02.Services;
using MenteSaudavel.Server._02.Services.Interfaces.Services;
using MenteSaudavel.Server._02.Services.Services;
using Microsoft.EntityFrameworkCore;

namespace MenteSaudavel.Server
{
    public static class Startup
    {
        public static void ConfigureServices(WebApplicationBuilder builder)
        {
            IServiceCollection services = builder.Services;

            services.AddCors(options =>
            {
                options.AddPolicy("AllowReactDev", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            services.AddControllers();

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddDbContext<DataBaseContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionString"))
            );

            services.AddTransient<DataBaseContext>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<ITokenService, TokenService>();
            services.AddTransient<IUsuarioService, UsuarioService>();
            services.AddTransient<IQuestionarioService, QuestionarioService>();
        }

        public static void ConfigureApplication(WebApplication app)
        {
            app.UseCors("AllowReactDev");

            app.UseDefaultFiles();
            app.UseStaticFiles();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");
        }
    }
}