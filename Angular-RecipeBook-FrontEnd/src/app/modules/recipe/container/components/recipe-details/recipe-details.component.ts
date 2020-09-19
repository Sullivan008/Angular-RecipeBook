import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetRecipeByIdResponseModel } from '../../../models/response-models/get-recipe-by-id-response.model';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private recipeGetByIdResolveSubsription: Subscription;
  private recipeDeletedSubscription: Subscription;

  public recipe: GetRecipeByIdResponseModel;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeService.getRecipeById(+params['id']);
    });

    this.recipeGetByIdResolveSubsription = this.recipeService.recipeGetByIdResolve.subscribe(recipe => {
      this.recipe = recipe;
    });

    this.recipeDeletedSubscription = this.recipeService.recipeDeleted.subscribe(() => {
      this.router.navigate(['/recipes']);
    });
  }

  ngOnDestroy(): void {
    this.recipeGetByIdResolveSubsription.unsubscribe();
    this.recipeDeletedSubscription.unsubscribe();
  }

  public onAddRecipeIngredientsToShoppingList() {
    this.recipeService.addRecipeIngredientsToShoppingList(this.recipe.ingredients);
  }

  public onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  public onDeleteRecipe(id: number): void {
    this.recipeService.deleteRecipe(id);
  }
}
