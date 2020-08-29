﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Application.BusinessLogicLayer.Modules.RecipeModule.Dtos;
using Application.DataAccessLayer.Entities;

namespace Application.BusinessLogicLayer.Modules.RecipeModule.Interfaces
{
    public interface ICreateAndUpdateRecipeService
    {
        Task<ICollection<RecipeIngredient>> InitialNewRecipeIngredients(InitialNewRecipeIngredientsDto modelDto);
    }
}