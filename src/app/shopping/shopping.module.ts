import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingRoutingModule } from "./shopping-routing.module";
import { ShoppingComponent } from "./shopping.component";

@NgModule({
  declarations: [
    ShoppingComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ShoppingRoutingModule,
    SharedModule
  ]
})
export class ShoppingModule {

}
