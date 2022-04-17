import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './authentication/auth.service';

import * as fromApp from './store/app.reducer';
import * as fromAuthActions from './authentication/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'order-please';
  constructor(private authSvc: AuthService,
      private store: Store<fromApp.AppState>){}

  ngOnInit(): void {
    // this.authSvc.autoSignIn();
    this.store.dispatch(new fromAuthActions.AutoLogin());
  }
}
