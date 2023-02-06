import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SignUpRoutingModule } from "./sign-up-routing.module";

@NgModule({
  declarations: [
  ],
  exports: [

  ],
  imports: [
    CommonModule,
     FormsModule,
     ReactiveFormsModule,
     SignUpRoutingModule
  ]
})
export class SignUpModule { }
