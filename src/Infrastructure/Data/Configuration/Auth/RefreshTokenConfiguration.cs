using Infrastructure.Entities.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configuration.Auth;


public sealed class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
{
    public void Configure(EntityTypeBuilder<RefreshToken> b)
    {
        b.HasKey(x => x.Id);

        b.HasIndex(x => x.UserId).IsUnique();

        b.Property(x => x.TokenHash)
            .IsRequired()
            .HasMaxLength(256);

        b.Property(x => x.CreatedByIp)
            .HasMaxLength(15);

        b.HasOne<Identity>()
            .WithOne(u => u.RefreshToken)
            .HasForeignKey<RefreshToken>(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}