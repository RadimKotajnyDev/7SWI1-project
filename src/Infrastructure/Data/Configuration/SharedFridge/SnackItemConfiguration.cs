using Infrastructure.Entities.SharedFridge;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configuration.SharedFridge;

public class SnackItemConfiguration : IEntityTypeConfiguration<SnackItem>
{
    public void Configure(EntityTypeBuilder<SnackItem> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).HasMaxLength(200).IsRequired();
        builder.Property(x => x.FridgeLocation).HasMaxLength(100).IsRequired();
        
        // Store Enum as string in Postgres for readability
        builder.Property(x => x.Status)
            .HasConversion<string>()
            .HasMaxLength(50);
    }
}