// import { Actions, ofType} from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AuthInterface } from '../auth.model';
import { AuthService } from '../auth.service';
import { UserModel } from '../user.model';
import * as fromAuthActions from './auth.actions';

const handleAuthentication = (email: string, userId: string, token: string, expiresIn: number) => {
  const expiryDate = new Date(
    new Date().getTime() + +expiresIn * 1000
  );
  const user = new UserModel(email, userId, token, expiryDate);
  localStorage.setItem('userData', JSON.stringify(user));

  return new fromAuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expiryDate,
  });
};

const handleerror = (errorResponse) => {
  let errorMessage = 'An Unknown error occured!';
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new fromAuthActions.AuthenticateFail(errorMessage));
  }

  switch (errorResponse.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage =
        'The email address is already in use by another account.';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage =
        'There is no user record corresponding to this identifier. The user may have been deleted.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage =
        'The password is invalid or the user does not have a password.';
      break;
    case 'USER_DISABLED':
      errorMessage =
        'The user account has been disabled by an administrator';
      break;
  }

  return of(new fromAuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(fromAuthActions.SIGNUP_START),
    switchMap((signUpData: fromAuthActions.SignupStart) => {
      return this.http
        .post<AuthInterface>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            environment.firebaseKey,
          {
            email: signUpData.payload.email,
            password: signUpData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((resData) => {
            this.authSvc.setLogoutTimer(+resData.expiresIn *1000)
          }),
          map((resData) => {
            return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
           }),
           catchError((errorResponse) => {
            return handleerror(errorResponse);
           })
          );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(fromAuthActions.LOGIN_START),
    switchMap((authData: fromAuthActions.LoginStart) => {
      return this.http
        .post<AuthInterface>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
            environment.firebaseKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((resData) => {
            this.authSvc.setLogoutTimer(+resData.expiresIn * 1000)
          }),
          map((resData) => {
           return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
          }),
          catchError((errorResponse) => {
           return handleerror(errorResponse);
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(fromAuthActions.AUTHENTICATE_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(fromAuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpireDate: Date;
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return {type: 'DUMMY' };
      }

      const loadedUser = new UserModel(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpireDate)
      );

      if(loadedUser) {
        // instead of sending the loadedUser data to userAuthSubject by ngRx we are dispatching userData
        // this.userAuthSubject.next(loadedUser);
        // this.store.dispatch

        const expireDuration =
          new Date(userData._tokenExpireDate).getTime() - new Date().getTime();

        this.authSvc.setLogoutTimer(expireDuration);

        return new fromAuthActions.AuthenticateSuccess
              ({email: loadedUser.email,
                userId: loadedUser.id,
                token: loadedUser.token,
                expirationDate: new Date(userData._tokenExpireDate)
            });


        // const expireDuration =
        //   new Date(userData._tokenExpireDate).getTime() - new Date().getTime();
        // this.autoSignOut(expireDuration);
      }
      return {type: 'DUMMY' };
    })
  )

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(fromAuthActions.LOGOUT),
    tap(() => {
      this.authSvc.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authSvc: AuthService
  ) {}
}
