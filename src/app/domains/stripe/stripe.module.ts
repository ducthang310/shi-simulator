import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StripeRoutingModule } from './stripe-routing.module';
import { IndexComponent } from './pages/index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    StripeRoutingModule
  ]
})
export class StripeModule { }
