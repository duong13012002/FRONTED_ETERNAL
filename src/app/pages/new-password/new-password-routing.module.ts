import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { NewPasswordComponent } from './new-password.component';

const routes: Routes = [{ path: '', component: NewPasswordComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewPasswordRoutingModule { }
