import {NgModule} from "@angular/core";
import {BillComponent} from "../bill/bill.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BillRoutingModule} from "../bill/bill-routing.module";
import {BuyNowComponent} from "./buy-now.component";
import {BuyNowRouting} from "./BuyNow-routing";

@NgModule({
  declarations: [
    BuyNowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BuyNowRouting,
  ]
})
export class BuyNowModule { }
