import { AuthGuard } from './helpers/auth.guard';
import { PageNotFoundComponent } from './components/errors/page-not-found/page-not-found.component';
import { DeviceComponent } from './components/device/device.component';
import { SigninComponent } from './components/authentication/signin/signin.component';

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'signin', component: SigninComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'device/:id', component: DeviceComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }