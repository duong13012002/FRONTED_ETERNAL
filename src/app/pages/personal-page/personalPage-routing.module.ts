import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PersonalPageComponent} from "./personal-page.component";

const routes: Routes = [{ path: '', component: PersonalPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalPageRoutingModule { }
