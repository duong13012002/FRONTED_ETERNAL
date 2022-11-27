import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Cart2RoutingModule } from './cart2-routing.module';
import { Cart2Component } from './cart2.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Cart2RoutingModule
  ]
})
export class Cart2Module { }
