// import { Injectable, OnDestroy, OnInit } from "@angular/core";
// import { BehaviorSubject, Observable } from "rxjs";
// import { IngredientModel } from "../shared/ingredient.model";

// @Injectable({
//   providedIn: 'root'
// })
// export class ShoppingService implements OnInit, OnDestroy{

//   private ingredients: IngredientModel[] = [
//     new IngredientModel('Banana', 3),
//     new IngredientModel('Apple', 13)
//   ];

//   private ingredientsChangedSubject: BehaviorSubject<IngredientModel[]> = new BehaviorSubject(this.ingredients);
//   public ingredientsChanged$: Observable<IngredientModel[]> = this.ingredientsChangedSubject.asObservable();

//   private onEditIngredienSubject: BehaviorSubject<number> = new BehaviorSubject(null);
//   public onEditIngredient$: Observable<number> = this.onEditIngredienSubject.asObservable();

//   private onEditModeSubject = new BehaviorSubject(false);
//   public onEditMode$ = this.onEditModeSubject.asObservable();

//   constructor() {}

//   ngOnInit(): void {

//   }

//   getIngredients() {
//     return this.ingredients.slice();
//   }

//   getIngredient(index: number) {
//     console.log('....', this.ingredients[index])
//     return this.ingredients[index];
//   }

//   addNewIngredient(value: IngredientModel) {
//     this.ingredients.push(value);
//     this.ingredientsChangedSubject.next(this.ingredients.slice());
//   }

//   addIngredients(ingredients: IngredientModel[]) {
//     // for(let ingredient of ingredients) {
//     //   this.addNewIngredient(ingredient);
//     // }
//     this.ingredients.push(...ingredients);
//     this.ingredientsChangedSubject.next(ingredients.slice());
//   }

//   deleteIngredient(index: number) {
//     this.ingredients.splice(index, 1);
//     this.ingredientsChangedSubject.next(this.ingredients.slice());
//   }

//   onEditIngredient(index: number, editedIngredient: IngredientModel) {
//     this.ingredients[index] = editedIngredient;
//     this.onEditModeSubject.next(true);
//     this.onEditIngredienSubject.next(index);
//     this.ingredientsChangedSubject.next(this.ingredients.slice())
//   }

//   ngOnDestroy() {
//     this.ingredientsChangedSubject.unsubscribe();
//   }
// }
