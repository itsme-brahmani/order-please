import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, switchMap, tap, map } from "rxjs/operators";
import { throwError, of } from "rxjs";
import { RecipeModel } from './../recipe/recipe.model';
import { RecipeService } from '../recipe/recipe.service';
import { UserModel } from './../authentication/user.model';
import { AuthService } from './../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})

export class OrderService implements OnInit {

  private gatewayUrl = 'https://order-please-93289-default-rtdb.firebaseio.com/';
  private options = {
    headers: new HttpHeaders().set('Authtrailget', 'sadhfagfhgs'),
    params: new HttpParams().set('secret', 'code')
  }

  // private normalizeRecipes = (recipes: RecipeModel[]) => recipes.map(recipe => ({ ingredients: [], ...recipe }));

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authSvc: AuthService) {

  }
  ngOnInit() {

  }

  savingData() {
    const recipes = this.recipeService.getRecipes();

    this.http.post<RecipeModel[]>(this.gatewayUrl + 'recipepost.json', {recipes})
    .pipe(
      catchError(err => {
        return throwError(err);
      })
    )
    .subscribe(data => {
      console.log(data,'......post data');

    });
  }

  fetchingData() {
    return this.http
      .get<RecipeModel[]>(this.gatewayUrl + 'recipepost.json')
      .pipe(
        map((responseData) => {
          const postArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key });
            }
          }
          return postArray.map((recipe) => {
            if (!recipe.ingredients) {
              recipe.ingredients = [];
            }
            return recipe;
          });
        }),
        tap((responseData) => {
          responseData.filter(recipes => {
            this.recipeService.setRecipe(recipes.recipes);
          })

        })
      )
  }
}
