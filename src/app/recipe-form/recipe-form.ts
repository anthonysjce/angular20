import { Component, inject } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-form',
  imports: [ReactiveFormsModule, JsonPipe, MatButtonModule, MatIconModule],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss',
})
export class RecipeForm {
  recipeService = inject(RecipeService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  protected recipeForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });
  addRecipe(): void {
    const newRecipe = {
      id: Date.now(), // Simple unique ID based on timestamp
      name: this.recipeForm.value.name || 'New Recipe',
      description: this.recipeForm.value.description || 'No description',
      imgUrl: 'https://via.placeholder.com/150',
      isFavorite: false,
      ingredients: [],
    };
    this.recipeService.addRecipe(newRecipe);
    this.recipeForm.reset();
    this.router.navigate(['/']);
  }
}
