import { Router } from '@angular/router';
import { AuthInterface } from './auth.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

import { AlertComponent } from '../shared/alert/app-alert.component';
import * as fromApp from '../store/app.reducer';
import * as fromAuthActions from '../authentication/store/auth.actions';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: []
})
export class Authentication implements OnInit{

  isLoginMode: boolean = true;
  errorMessage: string = null;
  isLoading = false;

  // @ViewChild('authForm')
  // public authForm: NgForm;

  constructor(private authService: AuthService,
              private router: Router,
              private hostViewContainerRef: ViewContainerRef,
              private store: Store<fromApp.AppState>){}

  ngOnInit(): void {

     // here instead of subscribing auth observable in 67 I'm selecting observable from auth reducer and dispatching an err to auth reducer

     this.store.select('auth').subscribe(
      authState => {
        this.isLoading = authState.loading;
        if(authState.user) {
          this.router.navigate(['/recipe']);
        }
        this.errorMessage = authState.authError;
        if (this.errorMessage) {
          // this.showAlert(this.errorMessage)
          this.isLoading = false;
        }
      },
    err => {
      this.errorMessage = err;

      this.isLoading = false;
    });
    // this.authForm?.reset();
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(!form.valid){
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthInterface>;

    this.isLoading = true;
    if (!this.isLoginMode) {
     authObs = this.authService.signUp(email, password);

    } else {
      // authObs = this.authService.signIn(email, password);
      this.store.dispatch(new fromAuthActions.LoginStart({email: email, password: password}))
    }

    // authObs.subscribe(response => {
    //   this.isLoading = false;
    //   this.router.navigate(['/recipe']);
    // },
    // err => {
    //   console.log(err)
    //   this.errorMessage = err;

    //   this.isLoading = false;
    // });

    form.reset();
  }

  onCloseErrorMsg() {
    this.errorMessage = null;
  }

  // errorAlert(msg) {
  //   const errComp = this.hostViewContainerRef.createComponent<AlertComponent>(AlertComponent);
  //   errComp.hostView(msg)
  // }

}
