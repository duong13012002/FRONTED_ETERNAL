import {RouterModule, Routes} from "@angular/router";
import {UpdateOrderComponent} from "./update-order.component";
import {NgModule} from "@angular/core";

const routes: Routes = [{ path: '', component: UpdateOrderComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateOderRoutingModule { }
