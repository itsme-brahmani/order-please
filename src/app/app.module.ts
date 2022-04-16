import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
// import { shoppingListReducer } from './shopping/store/shopping.reducer';
// import { authReducer } from './authentication/store/auth.reducer';
import * as fromAppReducer from './store/app.reducer';
import { AuthEffects } from './authentication/store/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    PageNotFoundComponent,
    // Authentication,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromAppReducer.appReducer
      // {shoppingList: shoppingListReducer,
      // auth: authReducer}
      ),
    EffectsModule.forRoot([AuthEffects]),
    SharedModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
