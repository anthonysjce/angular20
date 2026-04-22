import { Component, computed, input, signal } from '@angular/core';
import { RecipeModel } from '../models';
import { MOCK_RECIPES } from '../mock-recipes';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',

  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetail {
  recipe = input<RecipeModel>(MOCK_RECIPES[0]);
  servings = signal(2);
  adjustedIngredients = computed(() => {
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
