import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../../../services/shopping-list.service';
import { ShoppingListIngredientFormValidator } from '../../../validators/shopping-list-ingredient-form-validators';

@Component({
  selector: 'create-or-edit-shopping-list-ingredient',
  templateUrl: './create-or-edit-shopping-list-ingredient.component.html',
  styleUrls: ['./create-or-edit-shopping-list-ingredient.component.scss'],
})
export class ShoppingListIngredientEditComponent implements OnInit, OnDestroy {
  private shoppingListIngredientEditingSubscript: Subscription;

  public shoppingListIngredientForm: FormGroup;

  //#region GETTERS

  public get ingredientArrayIndex(): AbstractControl {
    return this.shoppingListIngredientForm.get('arrayIndex');
  }

  public get ingredientName(): AbstractControl {
    return this.shoppingListIngredientForm.get('name');
  }

  public get ingredientAmount(): AbstractControl {
    return this.shoppingListIngredientForm.get('amount');
  }

  //#endregion

  constructor(private shoppingListService: ShoppingListService) {
    this.shoppingListIngredientForm = new FormGroup({
      arrayIndex: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [
        Validators.required,
        ShoppingListIngredientFormValidator.amountValidator,
        ShoppingListIngredientFormValidator.maxAmountValueValidator,
      ]),
    });
  }

  public ngOnInit(): void {
    this.shoppingListIngredientEditingSubscript = this.shoppingListService.shoppingListIngredientEditing.subscribe(
      arrayIndex => {
        const selectedIngredient = this.shoppingListService.getShoppingListIngredientById(arrayIndex);

        this.shoppingListIngredientForm.setValue({
          arrayIndex: arrayIndex,
          name: selectedIngredient.name,
          amount: selectedIngredient.amount,
        });
      }
    );
  }

  public ngOnDestroy(): void {
    this.shoppingListIngredientEditingSubscript.unsubscribe();
  }

  public onCreateOrEditItem(): void {
    if (this.ingredientArrayIndex.value !== null && this.ingredientArrayIndex.value !== undefined) {
      this.shoppingListService.updateIngredientInShoppingList(this.shoppingListIngredientForm.value);
    } else {
      this.shoppingListService.addIngredientToShoppingList(this.shoppingListIngredientForm.value);
    }

    this.onClear();
  }

  public onClear(): void {
    this.shoppingListIngredientForm.reset();
  }

  public onDelete(): void {
    this.shoppingListService.deleteIngredientFromShoppingList(this.ingredientArrayIndex.value);

    this.onClear();
  }
}
