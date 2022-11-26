import {RouterModule, Routes} from "@angular/router";
import {BillComponent} from "../bill/bill.component";
import {NgModule} from "@angular/core";
import {BuyNowComponent} from "./buy-now.component";

const routes: Routes = [{ path: '', component: BuyNowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyNowRouting { }
