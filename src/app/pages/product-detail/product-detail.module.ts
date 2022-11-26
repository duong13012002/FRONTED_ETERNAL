import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProductRoutingModule} from "../product/product-routing.module";
import {ProductDetailRoutingModule} from "./product-detail-routing.module";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [

  ],
  exports: [

  ],
  imports: [
    CommonModule,
    ProductDetailRoutingModule
  ]
})
export class ProductModule { }
