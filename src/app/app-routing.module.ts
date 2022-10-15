import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryComponent} from './pages/category/category.component';
import {Home2Component} from "./pages/home2/home2.component";



const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full'
  },
  {
    path: 'pages',
    component: Home2Component,
  },
  {
    path: 'pages/cate',
    component: CategoryComponent,
  },
  { path: 'cart', loadChildren: () => import('./pages/cart2/cart2.module').then(m => m.Cart2Module) },
  { path: 'product', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
