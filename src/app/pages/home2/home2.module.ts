import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Home2RoutingModule } from './home2-routing.module';
import { Home2Component } from './home2.component';
import {AppModule} from "../../app.module";


@NgModule({
  declarations: [

  ],
    imports: [
        CommonModule,
        Home2RoutingModule,

    ]
})
export class Home2Module { }
