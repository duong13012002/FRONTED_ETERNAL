import { BuyNowComponent } from './pages/buy-now/buy-now.component';
import { Cart2Component } from './pages/cart2/cart2.component';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './pages/category/category.component';
import {Home2Component} from "./pages/home2/home2.component";
import {ProductComponent} from "./pages/product/product.component";
import {ProductModule} from "./pages/product/product.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgModule} from "@angular/core";
import {CookieModule} from "ngx-cookie";
import {ToastrModule} from "ngx-toastr";
import { CustommerIn4Component } from './pages/custommer-in4/custommer-in4.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import {MatTabsModule} from "@angular/material/tabs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FindNewProductComponent } from './pages/find-new-product/find-new-product.component';




@NgModule({
    declarations: [
        AppComponent,
        Home2Component,
        Cart2Component,
        CategoryComponent,
        ProductComponent,
        FindNewProductComponent,
        NotFoundPageComponent,
        ProductDetailComponent,
        BuyNowComponent,
        NavbarComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    CookieModule.forRoot(),
    ToastrModule.forRoot(),
    MatTabsModule,
    BrowserAnimationsModule,
  ],
    providers: [],
    exports: [
        ProductComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
