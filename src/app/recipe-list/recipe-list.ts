import { Component, computed, signal } from '@angular/core';
import { MOCK_RECIPES } from '../mock-recipes';
import { RecipeModel } from '../models';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  imports: [JsonPipe],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export class RecipeList {
    protected readonly recipe = signal<RecipeModel>(MOCK_RECIPES[0]);
   protected readonly servings = signal(2);
    //protected readonly adjustedIngredients =
    protected readonly adjustedIngredients = computed(() => {
      return this.recipe().ingredients.map((item) => {
        return { ...item, quantity: item.quantity * this.servings() };
      });
    });

    protected increment(): void {
    this.servings.update((currentServings) => currentServings + 1);
  }

  protected decrement(): void {
    this.servings.update((currentServings) => Math.max(1, currentServings - 1));
  }

}
