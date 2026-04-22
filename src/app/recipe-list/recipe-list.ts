import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Required for two-way binding
import { RecipeModel } from '../models';
import { RecipeDetail } from '../recipe-detail/recipe-detail';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeDetail, FormsModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export class RecipeList {
    private readonly recipeService = inject(RecipeService);
    protected readonly recipes = this.recipeService.getRecipes();
    protected readonly recipe = signal<RecipeModel>(this.recipes()[0]);
    protected readonly searchTerm = signal('');

    // Computed signal that automatically filters recipes based on searchTerm
    protected readonly filteredRecipes = computed(() => {
      const term = this.searchTerm().toLowerCase().trim();
      if (!term) return this.recipes();
      return this.recipes().filter(r => r.name.toLowerCase().includes(term));
    });


    selectRecipe(recipe: RecipeModel): void {
      this.recipe.set(recipe);
    }
}
