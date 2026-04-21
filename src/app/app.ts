import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipeModel } from './models';
import { MOCK_RECIPES } from './mock-recipes';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly recipe = signal<RecipeModel>(MOCK_RECIPES[0]);
  protected readonly servings = signal(2);
  //protected readonly adjustedIngredients =
  protected readonly adjustedIngredients = computed(() => {
    return this.recipe().ingredients.map((item) => {
      return { ...item, quantity: item.quantity * this.servings() };
    });
  });
  protected handleButton1Click(): void {
    this.recipe.set(MOCK_RECIPES[0]);
  }

  protected handleButton2Click(): void {
    this.recipe.set(MOCK_RECIPES[1]);
  }

  protected increment(): void {
    this.servings.update((currentServings) => currentServings + 1);
  }

  protected decrement(): void {
    this.servings.update((currentServings) => Math.max(1, currentServings - 1));
  }
}
