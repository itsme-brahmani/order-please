import { Action } from "@ngrx/store";
import { IngredientModel } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = '[Add] Ingredient';
export const ADD_INGREDIENTS = '[Add] Ingredients';
export const UPDATE_INGREDIENT = '[Update] Ingredient';
export const DELETE_INGREDIENT = '[Delete] Ingredient';
export const START_EDIT = '[Start] Edit';
export const STOP_EDIT = '[Stop] Edit';

export class AddIngredient implements Action {
  // throughout the application we can use this type and if we do any typomistakes It will show an error
  readonly type= ADD_INGREDIENT;

  constructor(public payload: IngredientModel){}
}

export class AddIngredients implements Action {
  // throughout the application we can use this type and if we do any typomistakes It will show an error
  readonly type= ADD_INGREDIENTS;

  constructor(public payload: IngredientModel[]){}
}

export class UpdateIngredient implements Action {
  // throughout the application we can use this type and if we do any typomistakes It will show an error
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: IngredientModel){}
}

export class DeleteIngredient implements Action {
  // throughout the application we can use this type and if we do any typomistakes It will show an error
  readonly type= DELETE_INGREDIENT;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payload: number){}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient | StartEdit | StopEdit;
