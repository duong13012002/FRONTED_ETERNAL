import {NgModule} from "@angular/core";
import {Cart2Component} from "../cart2/cart2.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Cart2RoutingModule} from "../cart2/cart2-routing.module";
import {BillComponent} from "./bill.component";
import {BillRoutingModule} from "./bill-routing.module";

@NgModule({
  declarations: [
    BillComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BillRoutingModule
  ]
})
export class BillModule { }
