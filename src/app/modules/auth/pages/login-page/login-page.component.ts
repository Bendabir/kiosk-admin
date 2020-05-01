import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services';
import { environment } from '@env';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  public hide = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([
        environment.routes.home
      ]);
    }
  }

  public login(apiKey: string) {
    this.authService.login(apiKey);
    this.router.navigate([
      environment.routes.home
    ]);
  }
}
