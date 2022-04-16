import { RecipeService } from './../../recipe.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipeModel } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})

export class RecipeItemComponent implements OnInit {
  @Input('recipe')
  public recipe: RecipeModel;

  @Input('index')
  public index: number;

  ngOnInit(): void {}
}
