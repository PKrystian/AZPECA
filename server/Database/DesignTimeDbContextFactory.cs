using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore.SqlServer;

namespace User.Function.Database
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<UserDb>
    {
        public UserDb CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("local-params.json")
                .Build();

            var builder = new DbContextOptionsBuilder<UserDb>();
            var connectionString = configuration.GetConnectionString("UserDb");
            builder.UseSqlServer(connectionString);
            return new UserDb(builder.Options);
        }
    }
}