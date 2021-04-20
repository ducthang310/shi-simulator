import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PusherRoutingModule } from './pusher-routing.module';
import { IndexComponent } from './pages/index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    PusherRoutingModule
  ]
})
export class PusherModule { }
