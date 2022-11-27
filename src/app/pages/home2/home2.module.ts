import { ProductComponent } from './../product/product.component';
import { AppRoutingModule } from './../../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Home2RoutingModule } from './home2-routing.module';
import { Home2Component } from './home2.component';
import {AppModule} from "../../app.module";
import { ProductModule } from "../product/product.module";



@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Home2RoutingModule,
    ]
})
export class Home2Module { }
