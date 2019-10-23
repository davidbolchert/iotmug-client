import { ErrorInterceptor } from './helpers/error-interceptor';
import { JwtInterceptor } from './helpers/jwt-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SigninComponent } from './components/authentication/signin/signin.component';
import { PageNotFoundComponent } from './components/errors/page-not-found/page-not-found.component';
import { fakeBackendProvider } from './helpers/fake-backend-interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, MatIconModule, MatListModule } from  '@angular/material';
import { DevicesComponent } from "./components/devices/devices.component";
import { DeviceTypesComponent } from './components/device-types/device-types.component';

@NgModule({
	declarations: [
		AppComponent,
		SigninComponent,
		PageNotFoundComponent,
		DevicesComponent,
		DeviceTypesComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatCheckboxModule,
		MatInputModule,
		MatFormFieldModule,
		MatSidenavModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		MatToolbarModule,
		MatListModule,
		MatIconModule,
		MatCardModule,
		MatSelectModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

		// provider used to create fake backend
		fakeBackendProvider
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
