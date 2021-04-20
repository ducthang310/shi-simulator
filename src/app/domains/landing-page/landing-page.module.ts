import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { UiModule } from '../../shared/ui/ui.module';


@NgModule({
  declarations: [IndexComponent],
    imports: [
        CommonModule,
        LandingPageRoutingModule,
        UiModule
    ]
})
export class LandingPageModule { }
