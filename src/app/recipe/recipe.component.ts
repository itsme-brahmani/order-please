import { RecipeService } from './recipe.service';
import { RecipeModel } from './recipe.model';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: []
})
export class ReciepComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {

  }

}
