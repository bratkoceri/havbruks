using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace LoggenData
{
    public class LoggenDataContext : DbContext
    {
        LoggenDataContext() {

        }
        public LoggenDataContext(DbContextOptions<LoggenDataContext> options) : base(options) {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        public DbSet<Boat> BoatsTable { get; set; }
        public DbSet<CrewMember> CrewMembersTable { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Boat>()
                .ToTable("Boats");
            modelBuilder.Entity<CrewMember>()
                .ToTable("CrewMembers");
            modelBuilder.Entity<CrewMember>()
                .Property(p => p.Role)
                .HasConversion<string>();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionbuilder) {
            optionbuilder.UseSqlite(@"Data Source=Boats.db");
        }
    }
}
