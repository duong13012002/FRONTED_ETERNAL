import { ProductDetailComponent } from './product-detail.component';

import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProductDetailRoutingModule} from "./product-detail-routing.module";

@NgModule({
  declarations: [

  ],
  exports: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductDetailRoutingModule,
  ]
})
export class ProductModule { }
