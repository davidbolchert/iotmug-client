import { DeviceTypesComponent } from './components/device-types/device-types.component';
import { DevicesComponent } from "./components/devices/devices.component";
import { AuthGuard } from './helpers/auth.guard';
import { PageNotFoundComponent } from './components/errors/page-not-found/page-not-found.component';
import { SigninComponent } from './components/authentication/signin/signin.component';

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/devices', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'signin', component: SigninComponent},
  { path: 'device', redirectTo: '/devices', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'devices', component: DevicesComponent, canActivate: [AuthGuard] },
  { path: 'device/:id', component: DevicesComponent, canActivate: [AuthGuard] },
  { path: 'device-type', redirectTo: '/device-types', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'device-types', component: DeviceTypesComponent, canActivate: [AuthGuard] },
  { path: 'device-type/:id', component: DeviceTypesComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }