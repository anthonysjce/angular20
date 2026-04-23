import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipeModel } from '../models';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  imports: [RouterLink],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly recipeService = inject(RecipeService);

  // We extract the 'id' from the URL and use it to find the recipe
  protected readonly recipe = computed(() => {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.recipeService.getRecipeById(id);
  });

  protected readonly servings = signal(2);

  protected readonly adjustedIngredients = computed(() => {
    const currentRecipe = this.recipe();
    if (!currentRecipe) return [];

    return currentRecipe.ingredients.map((item) => {
      return { ...item, quantity: item.quantity * this.servings() };
    });
  });

  protected increment(): void {
    this.servings.update((s) => s + 1);
  }

  protected decrement(): void {
    this.servings.update((s) => Math.max(1, s - 1));
  }
}
