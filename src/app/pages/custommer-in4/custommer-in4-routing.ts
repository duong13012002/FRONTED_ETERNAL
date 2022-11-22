import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustommerIn4Component} from "./custommer-in4.component";

const routes: Routes = [{ path: '', component: CustommerIn4Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustommerIn4Routing { }
