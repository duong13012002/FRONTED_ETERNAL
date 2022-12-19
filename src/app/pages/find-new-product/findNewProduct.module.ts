import {NgModule} from "@angular/core";
import {BillComponent} from "../bill/bill.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BillRoutingModule} from "../bill/bill-routing.module";
import {FindNewProductComponent} from "./find-new-product.component";
import {FindNewProductRoutingModule} from "./findNewProduct-routing.module";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FindNewProductRoutingModule
  ]
})
export class FindNewProductModule { }
