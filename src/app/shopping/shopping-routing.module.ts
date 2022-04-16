import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingComponent } from "./shopping.component";

const shoppingRoutes: Routes = [
  {
    path: '',
    component: ShoppingComponent,
    children: [
      {
        path: 'edit',
        component: ShoppingEditComponent,
      },
      {
        path: 'list',
        component: ShoppingListComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(shoppingRoutes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule {}
