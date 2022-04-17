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
    case fromAuthActions.AUTHENTICATE_SUCCESS:
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
    case fromAuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true
      }
    case fromAuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload
      }
    case fromAuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      }
    default:
      return state;
  }
}
