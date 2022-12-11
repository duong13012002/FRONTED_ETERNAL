import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {FindNewProductComponent} from "./find-new-product.component";

const routes: Routes = [{ path: '', component: FindNewProductComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindNewProductRoutingModule { }
