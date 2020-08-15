import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { ShoppingListHttpService } from './shopping-list-http.service';
import { ShoppingListIngredient } from '../models/shopping-list.model';
import { RecipeIngredient } from 'src/app/recipes/models/recipe-ingredient.model';
import { ShoppingListIngredientListItemResponseModel } from '../models/response-models/shopping-list-ingredient-list-item-response.model';

@Injectable()
export class ShoppingListService {
  private shoppingListIngredients: ShoppingListIngredient[];

  public shoppingListIngredientsChanged = new Subject<ShoppingListIngredient[]>();
  public shoppingListIngredientEditing = new Subject<number>();
  public shoppingListIngredientSaved = new Subject();

  constructor(private shoppingListHttpService: ShoppingListHttpService) {
    this.shoppingListIngredients = [];
  }

  public getShoppingListIngredients(): ShoppingListIngredient[] {
    return this.shoppingListIngredients;
  }

  public getShoppingListIngredientById(arrayIndex: number): ShoppingListIngredient {
    return this.shoppingListIngredients[arrayIndex];
  }

  public addIngredientsToShoppingList(ingredients: RecipeIngredient[]): void {
    ingredients.forEach(item => {
      this.addIngredientToShoppingList(new ShoppingListIngredient(item.name, item.amount));
    });

    this.shoppingListIngredientsChanged.next(this.shoppingListIngredients);
  }

  public addIngredientToShoppingList(shoppingListIngredient: ShoppingListIngredient): void {
    const shoppingListIngredientIndex = this.getShoppingListIngredientIndexByName(shoppingListIngredient.name);

    if (shoppingListIngredientIndex !== -1) {
      this.shoppingListIngredients[shoppingListIngredientIndex].amount += shoppingListIngredient.amount;
    } else {
      this.shoppingListIngredients.push(shoppingListIngredient);
    }

    this.shoppingListIngredientsChanged.next(this.shoppingListIngredients);
  }

  public updateIngredientInShoppingList(updatedElement: { arrayIndex: number; name: string; amount: number }): void {
    this.shoppingListIngredients[updatedElement.arrayIndex] = new ShoppingListIngredient(
      updatedElement.name,
      updatedElement.amount
    );

    this.shoppingListIngredientsChanged.next(this.shoppingListIngredients);
  }

  public deleteIngredientFromShoppingList(arrayIndex: number): void {
    this.shoppingListIngredients.splice(arrayIndex, 1);

    this.shoppingListIngredientsChanged.next(this.shoppingListIngredients);
  }

  public saveShoppingListIngredients() {
    this.shoppingListHttpService.saveShoppingList(this.shoppingListIngredients).subscribe(
      () => {
        this.shoppingListIngredientSaved.next();
      },
      err => {
        console.log(err);
      }
    );
  }

  public fetchShoppingListIngredients() {
    this.shoppingListHttpService.fetchShoppingListIngredients().subscribe(
      (response: ShoppingListIngredientListItemResponseModel[]) => {
        this.shoppingListIngredients = response;

        this.shoppingListIngredientsChanged.next(this.shoppingListIngredients);
      },
      err => {
        console.log(err);
      }
    );
  }

  //#region PRIVATE Helper Methods

  private getShoppingListIngredientIndexByName(name: string): number {
    return this.shoppingListIngredients.findIndex(x => x.name.toLowerCase().trim() === name.toLowerCase().trim());
  }

  //#endregion
}
