import { ActionReducerMap } from '@ngrx/store';

import * as fromShopping from '../shopping/store/shopping.reducer';
import * as fromAuth from '../authentication/store/auth.reducer';

export interface AppState {
  shoppingList: fromShopping.State,
  auth: fromAuth.State
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShopping.shoppingListReducer,
  auth: fromAuth.authReducer
};
