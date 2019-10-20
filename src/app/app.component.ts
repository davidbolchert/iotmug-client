import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';
import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	currentUser: User;
	title = 'IoTMug-app';

	constructor(
		private router: Router,
		private authenticationService: AuthenticationService
	) {
		this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
	}

	logout() {
		this.authenticationService.logout();
		this.router.navigate(['/signin']);
	}
}
