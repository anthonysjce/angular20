import { Injectable, signal } from '@angular/core';
import { MOCK_RECIPES } from './mock-recipes';
import { RecipeModel } from './models';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly recipes = signal<RecipeModel[]>(MOCK_RECIPES);

  getRecipes() {
    return this.recipes.asReadonly();
  }

  getRecipeById(id: number) {
    return this.recipes().find(r => r.id === id);
  }
}
