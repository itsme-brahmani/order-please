import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IngredientModel } from "../shared/ingredient.model";
import { RecipeModel } from "./recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // private recipes: RecipeModel[] = [
  //   new RecipeModel('Dosa',
  //                   'Dosa is the south indian favorite dish',
  //                   'https://upload.wikimedia.org/wikipedia/commons/9/9f/Dosa_at_Sri_Ganesha_Restauran%2C_Bangkok_%2844570742744%29.jpg',
  //                   [new IngredientModel('with onions', 50),
  //                    new IngredientModel('with Masala', 20)]),
  //   new RecipeModel('Masala Bajji',
  //                   'Bajji with MAsala made with onions',
  //                   'https://www.indianhealthyrecipes.com/wp-content/uploads/2014/11/mirchi-bajji.jpg',
  //                   [new IngredientModel('roasted', 20),
  //                   new IngredientModel('nonRoasted', 15)])
  // ];

  private recipes: RecipeModel[] = [];

  private recipesChangeSubject: BehaviorSubject<RecipeModel[]> = new BehaviorSubject(this.recipes);
  public recipeChanged$ = this.recipesChangeSubject.asObservable();

  private selectedRecipeDataSubject: BehaviorSubject<RecipeModel> = new BehaviorSubject(null);
  public selectedRecipeData$ : Observable<RecipeModel> = this.selectedRecipeDataSubject.asObservable();

  public setRecipe(recipes: RecipeModel[]) {

    this.recipes = recipes;
    this.recipesChangeSubject.next(this.recipes);
  }

  public resetRecipes() {
    this.recipes.length = 0;
  }

  public getRecipes() {
    console.warn(this.recipes.slice())
    this.recipesChangeSubject.next(this.recipes.slice());
    return this.recipes.slice();
  }

  public getRecipe(id: number) {
    return this.recipes[id];
  }

  public recipeItemList(value) {
    // this.onSelectedRecipe.emit(value);
    // this.recipes.push(value);
    this.selectedRecipeDataSubject.next(value)
  }

  public addRecipes(data: RecipeModel) {
    this.recipes.push(data);
    this.recipesChangeSubject.next(this.recipes.slice());
  }

  public updateRecipe(index: number, data: RecipeModel) {
    this.recipes[index] = data;
    this.recipesChangeSubject.next(this.recipes.slice());
  }

  public deleteRecipes(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChangeSubject.next(this.recipes.slice());
  }

}
