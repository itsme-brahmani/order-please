import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/app-alert.component";
import { ButtonsDirective } from "./buttons.directive";
import { DropdownDirective } from "./dropdown.directive";
import { LodingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { OrderService } from "./order-please.service";

@NgModule({
  declarations: [
    AlertComponent,
    LodingSpinnerComponent,
    ButtonsDirective,
    DropdownDirective,
  ],
  imports: [
    CommonModule,
  ],
  providers: [OrderService],
  exports: [
    AlertComponent,
    LodingSpinnerComponent,
    ButtonsDirective,
    DropdownDirective
  ]
})
export class SharedModule {}
