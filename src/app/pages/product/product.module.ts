import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProductComponent } from './product.component';
import {ProductRoutingModule} from "./product-routing.module";


@NgModule({
  declarations: [

  ],
  exports: [

  ],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
