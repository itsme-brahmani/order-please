import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.params['id'];
    let recipeDetails = this.recipeService.recipeItemList([id]);

    // const id = +this.activatedRoute.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
    this.activatedRoute.params.subscribe(
      (routeData: Params) => {
        recipeDetails = this.recipeService.recipeItemList(+routeData['id']);
      })


  }

}
