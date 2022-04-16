import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { IngredientModel } from './../../shared/ingredient.model';
import { RecipeService } from './../recipe.service';
// import { ShoppingService } from 'src/app/shopping/shopping.service';
import { RecipeModel } from './../recipe.model';
import * as ShoppingListActions from '../../shopping/store/shopping.actions';
// import * as ShoppingListReducer from '../../shopping/store/shopping.reducer';
import * as fromAppReducer from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipeList: RecipeModel;
  id: number;

  constructor(private recipeService: RecipeService,
              // private sLService: ShoppingService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private store: Store<fromAppReducer.AppState>) {
    // this.recipeService.selectedRecipeData$.subscribe((recipes) => {
    //   this.recipeList = recipes;
    //   console.warn(recipes);

    // });
  }

  ngOnInit(): void {
    // const id = this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.params.subscribe(
      (params : Params) => {
        this.id = +params['id'];
        // this.recipeList = this.recipeService.getRecipe(this.id);
        this.recipeService.recipeChanged$.subscribe((recipes: RecipeModel[]) => {
          this.recipeList = recipes[this.id];
        })
      }
    )
  }

  sendToShoppinglist(ingredients: IngredientModel[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
    // this.sLService.addIngredients(ingredients);
      //   this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  editRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.activatedRoute});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipes(this.id);
    this.router.navigateByUrl('/');
  }
}
