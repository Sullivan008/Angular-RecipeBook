﻿using Data.DataAccessLayer.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Data.DataAccessLayer.Context
{
    public class RecipeBookContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
    {
        public RecipeBookContext(DbContextOptions options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RecipeIngredient>()
                .HasKey(ri => new { ri.RecipeId, ri.IngredientId });

            modelBuilder.Entity<RecipeIngredient>()
                .HasOne(ri => ri.Recipe)
                .WithMany(r => r.RecipeIngredients)
                .HasForeignKey(ri => ri.RecipeId);

            modelBuilder.Entity<RecipeIngredient>()
                .HasOne(ri => ri.Ingredient)
                .WithMany(i => i.RecipeIngredients)
                .HasForeignKey(ri => ri.IngredientId);

            modelBuilder.Entity<ShoppingList>()
                .HasKey(sl => new { sl.UserId, sl.IngredientId });

            modelBuilder.Entity<ShoppingList>()
                .HasOne(sl => sl.User)
                .WithMany(u => u.ShoppingList)
                .HasForeignKey(sl => sl.UserId);

            modelBuilder.Entity<ShoppingList>()
                .HasOne(sl => sl.Ingredient)
                .WithMany(i => i.ShoppingList)
                .HasForeignKey(sl => sl.IngredientId);

            base.OnModelCreating(modelBuilder);
        }

        #region DbSets

        public DbSet<Recipe> Recipe { get; set; }

        public DbSet<Ingredient> Ingredient { get; set; }

        public DbSet<RecipeIngredient> RecipeIngredient { get; set; }

        public DbSet<ShoppingList> ShoppingList { get; set; }

        #endregion
    }
}
