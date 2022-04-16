import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

import { Authentication } from "./auth.component";

@NgModule({
  declarations: [ Authentication ],
  imports:[CommonModule, FormsModule, SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: Authentication,
      }
    ])],
  exports: [RouterModule]
})

export class AuthenticationModule {

}
