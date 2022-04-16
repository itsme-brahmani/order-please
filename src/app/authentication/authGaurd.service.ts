import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

import * as fromAppReducer from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate{
  constructor(private authSvc: AuthService,
    private router: Router,
    private store: Store<fromAppReducer.AppState>){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // return this.authSvc.userAuth$.pipe(
      return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      map(user => {
        const isAuth = !!user;
        if(isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      }),

      // one way to navigate to 'auth' if it is not authenticated
      // tap(isAuth => {
      //   if(!isAuth) {
      //     this.router.navigateByUrl('/auth');
      //   }
      // })
    )
  }

}
