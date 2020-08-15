﻿using System.ComponentModel.DataAnnotations;
using Application.DataAccessLayer.Entities.Core;

namespace Application.DataAccessLayer.Entities
{
    public class ShoppingList : IEntity
    {
        [Required]
        public int UserId { get; set; }

        public ApplicationUser User { get; set; }

        [Required]
        public int IngredientId { get; set; }

        public Ingredient Ingredient { get; set; }

        [Required]
        public int Amount { get; set; }
    }
}