import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, switchMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { UserModel } from "./user.model";

import * as fromAppReducer from '../store/app.reducer';
// import * as fromAuthActions from

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
    private store: Store<fromAppReducer.AppState>){}
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return this.store.select('auth').pipe(
    // return this.authService.userAuth$.pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      switchMap((user: UserModel) => {
        if(!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        })
        return next.handle(modifiedReq);
      })
    );
  }

}
