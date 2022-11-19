
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



@NgModule({
    declarations: [
        AppComponent,
        Home2Component,
        CategoryComponent,
        ProductComponent,
        CustommerIn4Component,
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
  ],
    providers: [],
    exports: [
        ProductComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
