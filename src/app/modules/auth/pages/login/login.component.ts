import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services';
import { environment } from '@env';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
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
