import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryComponent} from './pages/category/category.component';
import {Home2Component} from "./pages/home2/home2.component";
import {LoginRoutingModule} from "./pages/user-login/user-login-routing.module";
import {LoginModule} from "./pages/user-login/user-login.module";
import {UserLoginComponent} from "./pages/user-login/user-login.component";



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
  {
    path: 'login',
    component: UserLoginComponent,
  },
  // {
  //   path: '**',
  //   component: NotFoundPageComponent
  // },
  { path: 'cart', loadChildren: () => import('./pages/cart2/cart2.module').then(m => m.Cart2Module) },
  { path: 'product', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule) },
  { path: 'order-detail', loadChildren: () => import('./pages/order-detail/order-detail.module').then(m => m.OrderDetailModule) },
  { path: 'login', loadChildren: () => import('./pages/user-login/user-login.module').then(m => m.LoginModule)},
  { path: 'forgot-pass', loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)},
  { path: 'new-pass', loadChildren: () => import('./pages/new-password/new-password.module').then(m => m.NewPasswordModule)},
  { path: 'cusI4', loadChildren: () => import('./pages/custommer-in4/custommer-in4.module').then(m => m.CustommerIn4Module)},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
