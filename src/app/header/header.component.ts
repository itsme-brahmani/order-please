import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';


import { AuthService } from './../authentication/auth.service';
import { OrderService } from '../shared/order-please.service';

import * as fromAppReducer from '../store/app.reducer';
import * as fromAuthAction from '../authentication/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isAuthenticated: boolean = false;

  constructor
      (private orderService: OrderService,
        private authSvc: AuthService,
        private router: Router,
        private store: Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
    .pipe(
      map(authState => {
        return authState.user;
      })
    )
    .subscribe(
    // this.authSvc.userAuth$.subscribe(
      user => {
        // this.isAuthenticated = (!user ? user: true)
        this.isAuthenticated = !!user;
      }
    );
  }

  save() {
    this.orderService.savingData();
    // this.dataStorageService.storeRecipes();
  }

  fetch() {
    this.orderService.fetchingData().subscribe();
    // this.dataStorageService.fetchRecipes();
  }

  logout() {
    // this.authSvc.signOut();
    this.isAuthenticated = false;
    this.store.dispatch(new fromAuthAction.Logout)
  }


  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
