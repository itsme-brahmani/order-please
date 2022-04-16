import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

// import { ShoppingService } from './../shopping.service';
import { IngredientModel } from './../../shared/ingredient.model';
// import * as ShoppingListReducer from '../store/shopping.reducer';
import * as ShoppingListActions from '../store/shopping.actions';
import * as fromAppReducer from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Observable<{ingredients: IngredientModel[]}>;
  ingredients: IngredientModel[];

  constructor(
              // private shoppingService: ShoppingService,
              private store: Store<fromAppReducer.AppState>) {}

  ngOnInit() {
    // we are getting ingredients data from store
    this.store.select('shoppingList').subscribe(ing => {
      this.ingredients = ing.ingredients;
    });

    // this.ingredients = this.shoppingService.getIngredients();
    // console.log('ingridents shopping list', this.ingredients)
    // // to add ingredients as a behaviour subject
    // // this.ingredients = this.shoppingService.getIngredients();
    // this.subscription = this.shoppingService.ingredientsChanged$.subscribe((val: IngredientModel[]) => {
    //   this.ingredients = val;
    // });
  }

  onEditItem(index: number) {
    // this.shoppingService.onEditIngredient(index, this.ingredients[index]);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
