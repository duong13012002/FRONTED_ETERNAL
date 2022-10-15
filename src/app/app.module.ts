import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './pages/category/category.component';
import {Home2Component} from "./pages/home2/home2.component";
import {ProductComponent} from "./pages/product/product.component";
import {ProductModule} from "./pages/product/product.module";

@NgModule({
    declarations: [
        AppComponent,
        Home2Component,
        CategoryComponent,
        ProductComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ProductModule
  ],
    providers: [],
    exports: [
        ProductComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
