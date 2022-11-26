import {RouterModule, Routes} from "@angular/router";
import {Cart2Component} from "../cart2/cart2.component";
import {NgModule} from "@angular/core";
import {BillComponent} from "./bill.component";
import {BuyNowComponent} from "../buy-now/buy-now.component";

const routes: Routes = [{ path: '', component: BillComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRoutingModule { }
