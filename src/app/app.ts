import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipeModel } from './models';
import { MOCK_RECIPES } from './mock-recipes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly recipie = signal<RecipeModel>(MOCK_RECIPES[0]);
  protected readonly count = signal(0);
  protected handleButton1Click() {
    this.recipie.set(MOCK_RECIPES[0]);
  }
  protected handleButton2Click() {
    this.recipie.set(MOCK_RECIPES[1]);
  }
  protected increment() {
    this.count.update((currentCount) => currentCount + 1);
  }
  protected decrement() {
    this.count.update((currentCount) => currentCount - 1);
  }
}
