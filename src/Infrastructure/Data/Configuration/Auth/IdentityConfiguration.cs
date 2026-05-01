using Infrastructure.Entities.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure.Data.Configuration.Auth;

public sealed class IdentityConfiguration : IEntityTypeConfiguration<Identity>
{
    public void Configure(EntityTypeBuilder<Identity> b)
    {
        var rolesConverter = new ValueConverter<List<IdentityRole>, string>(
            v => string.Join(',', v.Select(r => r.ToString())),
            v => v.Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(Enum.Parse<IdentityRole>)
                .ToList());

        b.HasKey(x => x.Id);

        b.Property(x => x.Email)
            .IsRequired()
            .HasMaxLength(150);

        b.HasIndex(x => x.Email).IsUnique();

        b.Property(x => x.PasswordHash)
            .IsRequired()
            .HasMaxLength(128);

        b.Property(x => x.Roles)
            .HasConversion(rolesConverter)
            .HasMaxLength(256);
    }
}