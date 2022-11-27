import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ProductRoutingModule} from "../product/product-routing.module";
import {CustommerIn4Routing} from "./custommer-in4-routing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CustommerIn4Component } from "./custommer-in4.component";

@NgModule({
  declarations: [
    CustommerIn4Component
  ],
  exports: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustommerIn4Routing

  ]
})
export class CustommerIn4Module { }
