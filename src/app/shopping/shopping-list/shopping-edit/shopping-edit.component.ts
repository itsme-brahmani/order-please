import { OnDestroy } from '@angular/core';
import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription} from 'rxjs';
import { Store } from '@ngrx/store';

// import { ShoppingService } from './../../shopping.service';
import { IngredientModel } from '../../../shared/ingredient.model';
import * as ShoppingListActions from '../../store/shopping.actions';
// import * as ShoppingListReducer from '../../store/shopping.reducer';
import * as fromAppReducer from '../../../store/app.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  item: IngredientModel;
  onEditMode: boolean = false;
  // onEditedItemIndex: number;
  EditedIngredient: IngredientModel;

  private subscriptions: Subscription[] = [];

  @ViewChild('f', {static: false})
  public slform: NgForm;

  // @Output('onAddedItem')
  // public onAddedItem = new EventEmitter<IngredientModel>();

  constructor(
              // private shoppingService: ShoppingService,
              private store: Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    this.subscriptions.push(this.store.select('shoppingList').subscribe(startData => {
      if (startData.editedIngredientIndex > -1) {
        // this.onEditedItemIndex = startData.editedIngredientIndex;
        this.onEditMode = true;
        this.EditedIngredient = startData.editedIngredient;
        this.slform?.setValue({
          name: this.EditedIngredient.name,
          amount: this.EditedIngredient.amount
        })
      } else {
        this.onEditMode = false;
      }
    }))

    // this.subscriptions.push(this.shoppingService.onEditIngredient$.subscribe(
    //   (index: number) => {
    //     this.onEditedItemIndex = index;
    //     this.onEditMode = true;
    //     this.EditedIngredient = this.shoppingService.getIngredient(index);

    //   }
    // ));

    // this.subscriptions.push(this.shoppingService.onEditMode$.subscribe(
    //   (val: boolean) => this.onEditMode = val
    // ))
  }

  onAdd(form: NgForm) {
    const newIngrediant = new IngredientModel(form.value.name, form.value.amount);
    // this.onAddedItem.emit(newIngrediant);
    if (this.onEditMode) {
      // this.shoppingService.onEditIngredient(this.onEditedItemIndex, newIngrediant);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngrediant));
    } else {
      // this.shoppingService.addNewIngredient(newIngrediant);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngrediant))
      this.onEditMode = false;
    }
    this.onEditMode = false;
    form.reset();
  }

  onClear() {
    this.slform.reset();
    this.onEditMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient())
    // this.shoppingService.deleteIngredient(this.onEditedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
    this.store.dispatch(new ShoppingListActions.StopEdit());

  }
}
