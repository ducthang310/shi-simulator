import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { IndexComponent } from './app-components/layout/index/index.component';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    redirectTo: 'auth/login'
  },
  {
    path: 'logout',
    pathMatch: 'full',
    redirectTo: 'auth/logout'
  },
  {
    path: 'auth',
    loadChildren: () => import('./domains/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./domains/landing-page/landing-page.module').then(m => m.LandingPageModule),
      },
      {
        path: 'account',
        canActivate: [AuthGuard],
        loadChildren: () => import('./domains/account/account.module').then(m => m.AccountModule),
      },
      {
        path: 'pusher',
        canActivate: [AuthGuard],
        loadChildren: () => import('./domains/pusher/pusher.module').then(m => m.PusherModule),
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
