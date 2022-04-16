import { UserModel } from "../user.model";
import * as fromAuthActions from './auth.actions';

export interface State {
  user: UserModel;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user : null,
  authError: null,
  loading: false
}

export function authReducer(state = initialState, action: fromAuthActions.AuthActions) {
  switch(action.type) {
    case fromAuthActions.LOGIN:
      const user = new UserModel(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
      return {
        ...state,
        authError: null,
        user: user,
        loading: false
      }
    case fromAuthActions.LOGOUT:
      return {
        ...state,
        user: null
      }
    case fromAuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      }
    case fromAuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload
      }
    default:
      return state;
  }
}
