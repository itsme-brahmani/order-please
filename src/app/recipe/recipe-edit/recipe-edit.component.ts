import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ShoppingService } from './../../shopping/shopping.service';
import { RecipeModel } from './../recipe.model';
import { RecipeService } from './../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  isEdit: boolean = false;
  recipeForm: FormGroup ;

  constructor(private activatedRoute: ActivatedRoute,
    private recipeSvc: RecipeService,
    private router: Router,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.isEdit = params['id'] != null;
        this.initForm();
      }
    )

  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredient= new FormArray([]);

    if(this.isEdit) {
      const recipe = this.recipeSvc.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if(recipe['ingredients']) {
        for(let ingredient of recipe.ingredients) {
          recipeIngredient.push(
            new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredient
    })
  }

  onSave() {
    // const newRecipe = new RecipeModel(
    //             this.recipeForm.value['name'],
    //             this.recipeForm.value['imagePath'],
    //             this.recipeForm.value['description'],
    //             this.recipeForm.value['ingredients'],
    //             )
    if (this.isEdit) {
      this.recipeSvc.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeSvc.addRecipes(this.recipeForm.value);
      this.recipeForm.reset();
    }
    this.onCancel();
  }

  addNewIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl('', Validators.required),
        'amount': new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )

    // this.slsvc.addIngredients(this.recipeForm.get('ingredients'[this.id]).value);
    // console.log(this.recipeForm.get('ingredients'[this.id]).value);

  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  clear(index) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
