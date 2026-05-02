using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configuration.User;

public class UserConfiguration : IEntityTypeConfiguration<Entities.User.User>
{
    public void Configure(EntityTypeBuilder<Entities.User.User> builder)
    {
        builder.HasKey(u => u.Id);

        builder.HasIndex(u => u.IdentityId).IsUnique();

        builder.Property(u => u.FirstName).HasMaxLength(100);
        builder.Property(u => u.LastName).HasMaxLength(100);
    }
}