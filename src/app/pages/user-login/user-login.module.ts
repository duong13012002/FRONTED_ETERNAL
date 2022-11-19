import { UserLoginComponent } from './user-login.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { LoginRoutingModule } from './user-login-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    UserLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
  ]
})
export class LoginModule { }
