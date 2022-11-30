import { BuyNowComponent } from './pages/buy-now/buy-now.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryComponent} from './pages/category/category.component';
import {Home2Component} from "./pages/home2/home2.component";
import {UserLoginComponent} from "./pages/user-login/user-login.component";
import { Cart2Component } from './pages/cart2/cart2.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full'
  },
  // {
  //   path:'404',
  //   component: NotFoundPageComponent
  // },
  // {
  //   path:'***',
  //   redirectTo: '/404'
  // },
  {
    path: 'pages',
    component: Home2Component,
  },
  {
    path: 'pages/cate',
    component: CategoryComponent,
  },
  {
    path: 'login',
    component: UserLoginComponent,
  },
  // {
  //   path:'cart',
  //   component: Cart2Component
  // },
  {
    path: 'productDetails/:id',
    component:ProductDetailComponent
  },
  {
    path:'buyNow',
    component:BuyNowComponent
  },
  { path: 'cart', loadChildren: () => import('./pages/cart2/cart2.module').then(m => m.Cart2Module) },
  { path: 'product', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule) },
  { path: 'order-detail', loadChildren: () => import('./pages/order-detail/order-detail.module').then(m => m.OrderDetailModule) },
  { path: 'login', loadChildren: () => import('./pages/user-login/user-login.module').then(m => m.LoginModule)},
  { path: 'forgot-pass', loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)},
  { path: 'new-pass', loadChildren: () => import('./pages/new-password/new-password.module').then(m => m.NewPasswordModule)},
  { path: 'cusI4', loadChildren: () => import('./pages/custommer-in4/custommer-in4.module').then(m => m.CustommerIn4Module)},
  // { path: 'productDetails/:id', loadChildren: () => import('./pages/product-detail/product-detail.module').then(m => m.ProductModule)},
  { path: 'order', loadChildren: () => import('./pages/bill/bill.module').then(m => m.BillModule)},
  // { path: 'buyNow', loadChildren: () => import('./pages/buy-now/BuyNow.module').then(m => m.BuyNowModule)},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
