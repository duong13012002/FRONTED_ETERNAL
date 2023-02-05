import { BuyNowComponent } from './pages/buy-now/buy-now.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryComponent} from './pages/category/category.component';
import {Home2Component} from "./pages/home2/home2.component";
import {UserLoginComponent} from "./pages/user-login/user-login.component";
import { Cart2Component } from './pages/cart2/cart2.component';
import {FindNewProductComponent} from "./pages/find-new-product/find-new-product.component";
import {UserGuard} from "./auth/user.guard";
import {PersonalPageComponent} from "./pages/personal-page/personal-page.component";



const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full'
  },
  {
    path:'404',
    component: NotFoundPageComponent
  },
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
  {
    path: 'personalPage',
    component: PersonalPageComponent,
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
  {
    path:'cart',
    component: Cart2Component,
    canActivate:[UserGuard]
  },

  // { path: 'cart', loadChildren: () => import('./pages/cart2/cart2.module').then(m => m.Cart2Module) },
  { path: 'product', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule) },
  { path: 'order-detail', loadChildren: () => import('./pages/order-detail/order-detail.module').then(m => m.OrderDetailModule),
  canActivate:[UserGuard]},
  { path: 'login', loadChildren: () => import('./pages/user-login/user-login.module').then(m => m.LoginModule)},
  { path: 'forgot-pass', loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)},
  { path: 'new-pass', loadChildren: () => import('./pages/new-password/new-password.module').then(m => m.NewPasswordModule)},
  { path: 'cusI4', loadChildren: () => import('./pages/custommer-in4/custommer-in4.module').then(m => m.CustommerIn4Module)},
  // { path: 'productDetails/:id', loadChildren: () => import('./pages/product-detail/product-detail.module').then(m => m.ProductModule)},
  { path: 'order', loadChildren: () => import('./pages/bill/bill.module').then(m => m.BillModule),canActivate:[UserGuard]},
  {path: 'home', loadChildren:() => import('./pages/find-new-product/findNewProduct.module').then(m => m.FindNewProductModule)},
  {path: 'updateOder/:id', loadChildren:() => import('./pages/update-order/updateOder.module').then(m => m.UpdateOderModule),canActivate:[UserGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
