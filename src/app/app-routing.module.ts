import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { RecipeResolver } from './recipe/recipe-resolver.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipe',
    pathMatch: 'full'
  },
  {
    path: 'recipe',
    // loadChildren: './recipe/recipe.module#RecipeModule'
    // lazy loading - until calling the recipe module we are not adding it to bundling
    loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule)
  },

  {
    path: 'shopping',
    loadChildren: ()=> import('./shopping/shopping.module').then(m => m.ShoppingModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  }

  // {
  //   path: '**',
  //   pathMatch: 'full',
  //   component: PageNotFoundComponent,
  //   data: {
  //     title: 'Not found'
  //   }
  // }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
