// import { Actions, ofType} from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AuthInterface } from '../auth.model';
import * as fromAuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(fromAuthActions.LOGIN_START),
    switchMap((authData: fromAuthActions.LoginStart) => {
      return this.http.post<AuthInterface>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseKey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true,
        }
      ).pipe(
        map((resData) => {
          const expiryDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          return new fromAuthActions.Login({
              email: resData.email,
              userId: resData.localId, token: resData.idToken, expirationDate: expiryDate})
        }),
        catchError(errorResponse => {
          let errorMessage = 'An Unknown error occured!';
          if(!errorResponse.error || !errorResponse.error.error) {
            return of(new fromAuthActions.LoginFail(errorMessage));
          }

          switch(errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = "The email address is already in use by another account."
              break;
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
              break;
            case 'INVALID_PASSWORD':
              errorMessage = 'The password is invalid or the user does not have a password.';
              break;
            case 'USER_DISABLED':
              errorMessage = 'The user account has been disabled by an administrator';
              break;
          }

          return of(new fromAuthActions.LoginFail(errorMessage));
        })
      )
    }),
  );

  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(fromAuthActions.LOGIN),
    tap(() => {
      this.router.navigate(['/']);
    })
  )

  constructor(private actions$: Actions, private http: HttpClient,
    private router: Router) {}
}
