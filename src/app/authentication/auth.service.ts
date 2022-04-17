import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Injectable } from "@angular/core";
import { catchError, tap } from 'rxjs/operators';

import { AuthInterface } from './auth.model';
import { UserModel } from './user.model';
import { environment } from '../../environments/environment';

import * as fromApp from '../store/app.reducer';
import * as fromAuthActions from '../authentication/store/auth.actions';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // private userAuthSubject = new BehaviorSubject<UserModel>(null);
  // public userAuth$ = this.userAuthSubject.asObservable();

  tokenExpirationTimer: number;

  constructor(private http: HttpClient,
      private router: Router,
      private store: Store<fromApp.AppState>){}

      //while we are implementing these methods in store we are not using this anywhere
  // signUp(email: string, password: string) {
  //   return this.http.post<AuthInterface>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseKey, {
  //     email: email,
  //     password: password,
  //     returnSecureToken: true
  //   }).pipe(
  //     tap(resData => {
  //       this.handlingAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
  //     }),
  //     catchError(this.handlingError)
  //   )
  // }

  // signIn(email: string, password: string) {
  //   return this.http.post<AuthInterface>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseKey,{
  //     email: email,
  //     password: password,
  //     returnSecureToken: true
  //   }).pipe(
  //     tap(resData => {
  //       this.handlingAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
  //     }),
  //     catchError(this.handlingError)
  //   )
  // }

  // private handlingError(errorResponse: HttpErrorResponse) {
  //   let errorMessage = 'An Unknown error occured!';
  //   if(!errorResponse.error || !errorResponse.error.error) {
  //     throwError(errorMessage);
  //   }

  //   switch(errorResponse.error.error.message) {
  //     case 'EMAIL_EXISTS':
  //       errorMessage = "The email address is already in use by another account."
  //       break;
  //     case 'EMAIL_NOT_FOUND':
  //       errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
  //       break;
  //     case 'INVALID_PASSWORD':
  //       errorMessage = 'The password is invalid or the user does not have a password.';
  //       break;
  //     case 'USER_DISABLED':
  //       errorMessage = 'The user account has been disabled by an administrator';
  //       break;
  //   }

  //   return throwError(errorMessage);
  // }

  // private handlingAuthentication(email: string, userId: string, token: string, expiresIn: number) {
  //   const expiryDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new UserModel(
  //     email,
  //     userId,
  //     token,
  //     expiryDate
  //   );

  //   // this.userAuthSubject.next(user);
  //   this.store.dispatch(new fromAuthActions.AuthenticateSuccess({email: email, userId: userId, token: token, expirationDate: expiryDate}))

  //   this.autoSignOut(expiresIn * 1000);
  //   localStorage.setItem('authUserData', JSON.stringify(user));

  // }

  public autoSignIn() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpireDate: Date;
    } = JSON.parse(localStorage.getItem('authUserData'));

    if (!userData) {
      return {type: 'DUMMY' };
    }

    const loadedUser = new UserModel(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpireDate)
    );

    // If the user already have the loaded data with token assigning same data to login automatically

    //userModel token is coming as null
    // to-do token value
    if(loadedUser.token) {
      // instead of sending the loadedUser data to userAuthSubject by ngRx we are dispatching userData
      // this.userAuthSubject.next(loadedUser);
      // this.store.dispatch
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
  }

  // public signOut() {
  //   // this.userAuthSubject.next(null);
  //   this.store.dispatch(new fromAuthActions.Logout());
  //   // this.router.navigate(['/auth']);
  //   localStorage.removeItem('authUserData');
  //   if(this.tokenExpirationTimer) {
  //     clearTimeout(this.tokenExpirationTimer);
  //   }
  //   this.tokenExpirationTimer = null;
  // }

  public setLogoutTimer(expireDuration) {
    setTimeout( () => {
      // this.signOut();
      this.store.dispatch(new fromAuthActions.Logout());
    },
    expireDuration)
  }

  clearLogoutTimer() {
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

}
