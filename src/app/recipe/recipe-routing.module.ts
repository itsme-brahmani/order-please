import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGaurd } from "../authentication/authGaurd.service";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolver } from "./recipe-resolver.service";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { ReciepComponent } from "./recipe.component";

const recipeRoutes: Routes = [
  {
    path: '',
    component: ReciepComponent,
    canActivate:[AuthGaurd],
    children: [
      {
        path: '',
        component: RecipeStartComponent,
      },
      {
        path: 'new',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetailsComponent,
        resolve: [RecipeResolver]
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipeResolver]
      },
    ],
  }];

@NgModule({
  imports: [RouterModule.forChild(recipeRoutes)],
  exports: [RouterModule]
})

export class RecipeRoutingModule {

}
