using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace User.Function.Database
{
    public class UserDb : DbContext
    {
        public UserDb(DbContextOptions<UserDb> options) : base(options)
        {
        }
        public DbSet<UserService.User> Users { get; set; }
        public DbSet<RegistrationService.Registration> Registrations { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            ConfigureUserEntity(modelBuilder.Entity<UserService.User>());
            ConfigureRegistrationEntity(modelBuilder.Entity<RegistrationService.Registration>());
        }
        private void ConfigureUserEntity(EntityTypeBuilder<UserService.User> builder)
        {
            builder.ToTable("User");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("Id").IsRequired();
            builder.Property(x => x.Name).HasColumnName("Name").IsRequired();
            builder.Property(x => x.Surname).HasColumnName("Surname").IsRequired();
            builder.Property(x => x.Balance).HasColumnName("Balance").IsRequired();

            builder.HasMany(u => u.Registration)
                .WithOne(r => r.User)
                .HasForeignKey(r => r.UserId);
        }
        private void ConfigureRegistrationEntity(EntityTypeBuilder<RegistrationService.Registration> builder)
        {
            builder.ToTable("Registration");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("Id").IsRequired();
            builder.Property(x => x.UserId).HasColumnName("UserId").IsRequired();
            builder.Property(x => x.DateEntry).HasColumnName("DateEntry").IsRequired();
            builder.Property(x => x.DateExit).HasColumnName("DateExit").IsRequired();

            builder.HasOne(r => r.User)
                .WithMany(u => u.Registration)
                .HasForeignKey(r => r.UserId);
        }
    }
}