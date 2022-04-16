import { RecipeService } from './recipe.service';
import { OrderService } from './../shared/order-please.service';
import { RecipeModel } from './recipe.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<RecipeModel[]>{

  constructor(private orderService: OrderService,
            private recipesService: RecipeService
    ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();

    if (recipes.length === 0) {
      return this.orderService.fetchingData();
    } else {
      return recipes;
    }
  }
}
