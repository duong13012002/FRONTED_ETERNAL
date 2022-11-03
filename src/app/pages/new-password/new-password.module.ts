import { CommonModule } from '@angular/common';
import { NewPasswordComponent } from './new-password.component';
import { NgModule } from "@angular/core";
import { NewPasswordRoutingModule } from './new-password-routing.module';

@NgModule({
  declarations: [
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    NewPasswordRoutingModule
  ]
})
export class NewPasswordModule { }
