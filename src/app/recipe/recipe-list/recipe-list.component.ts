import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from './../recipe.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { RecipeModel } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes = [];
  subscriptions: Subscription[] = [];

  constructor
    (private recipeService: RecipeService,
      private router: Router,
      private activatedRouter: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.subscriptions.push(this.recipeService.recipeChanged$.subscribe((recipes: RecipeModel[]) => {
      this.recipes = recipes;
    }));
    this.recipes = this.recipeService.getRecipes();
  }

  newRecipe() {
    this.router.navigate(['new'], {relativeTo: this.activatedRouter})
    // this.recipes.push('Masala Bajji', 'Bajji with MAsala made with onions', 'https://www.indianhealthyrecipes.com/wp-content/uploads/2014/11/mirchi-bajji.jpg')
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }
}
