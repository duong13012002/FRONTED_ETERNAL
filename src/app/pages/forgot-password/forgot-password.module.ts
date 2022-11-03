import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { NgModule } from "@angular/core";
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';

@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule
  ]
})
export class ForgotPasswordModule { }
