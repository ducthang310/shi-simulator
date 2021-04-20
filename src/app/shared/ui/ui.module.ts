import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LogoComponent } from './components/logo/logo.component';
import { RouterModule } from '@angular/router';
import { RocketComponent } from './components/rocket/rocket.component';

const sharedComponents = [
  ModalConfirmComponent, LoadingComponent, LogoComponent, RocketComponent
];

@NgModule({
  declarations: [
    ...sharedComponents
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ...sharedComponents
  ]
})
export class UiModule { }
