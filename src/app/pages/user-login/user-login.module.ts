import { UserLoginComponent } from './user-login.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { LoginRoutingModule } from './user-login-routing.module';

@NgModule({
  declarations: [
    UserLoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
