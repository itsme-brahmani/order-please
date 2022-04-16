import { IngredientModel } from "../../shared/ingredient.model";
import * as ShoppingActions from './shopping.actions';

export interface State {
  ingredients: IngredientModel[],
  editedIngredient: IngredientModel,
  editedIngredientIndex: number
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients : [
    new IngredientModel('Banana', 3),
    new IngredientModel('Apple', 13)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}
// initial state tells us the argument declarations if any
export function shoppingListReducer(
  state = initialState,
  action: ShoppingActions.ShoppingListActions) {

  // here we are doing different actions - add ingredients, delete ingredents
  switch (action.type) {
    case ShoppingActions.ADD_INGREDIENT:
      return {
        ...state,
        // action.payload which tells us which formate it would be like
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        // action.payload which tells us which formate it would be like
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== state.editedIngredientIndex;
        }),
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case ShoppingActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: state.ingredients[action.payload]
      };

    case ShoppingActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      }
    default:
      return state;
  }

}
