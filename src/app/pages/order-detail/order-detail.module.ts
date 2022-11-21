import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDetailRoutingModule } from './order-detail-routing.module';
import { OrderDetailComponent } from './order-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrderDetailRoutingModule
  ]
})
export class OrderDetailModule { }
