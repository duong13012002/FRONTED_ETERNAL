import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Cart2RoutingModule } from './cart2-routing.module';
import { Cart2Component } from './cart2.component';


@NgModule({
  declarations: [
    Cart2Component
  ],
  imports: [
    CommonModule,
    Cart2RoutingModule
  ]
})
export class Cart2Module { }
