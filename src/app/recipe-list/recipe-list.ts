import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Required for two-way binding
import { Router, RouterLink } from '@angular/router';
import { RecipeModel } from '../models';
import { RecipeService } from '../recipe.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-list',
  imports: [FormsModule, RouterLink, MatButtonModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export class RecipeList {
  private readonly recipeService = inject(RecipeService);
  protected readonly recipes = this.recipeService.getRecipes();
  protected readonly searchTerm = signal('');

  // Computed signal that automatically filters recipes based on searchTerm
  protected readonly filteredRecipes = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.recipes();
    return this.recipes().filter((r) => r.name.toLowerCase().includes(term));
  });
  private readonly router = inject(Router);

  protected handleAddRecipe(): void {
    this.router.navigate(['/add']);
  }
}
