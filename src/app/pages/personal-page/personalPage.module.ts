import {NgModule} from "@angular/core";
import {UserLoginComponent} from "../user-login/user-login.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginRoutingModule} from "../user-login/user-login-routing.module";
import {PersonalPageRoutingModule} from "./personalPage-routing.module";
import {PersonalPageComponent} from "./personal-page.component";

@NgModule({
  declarations: [
    PersonalPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PersonalPageRoutingModule,
  ]
})
export class PersonalPageModule { }
