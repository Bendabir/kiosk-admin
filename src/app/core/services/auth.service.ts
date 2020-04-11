import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static LS_FIELD = 'apiKey';

  constructor() { }

  public get apiKey() {
    return localStorage.getItem(AuthService.LS_FIELD);
  }

  public isAuthenticated(): boolean {
    return this.apiKey !== null;
  }

  public login(apiKey: string) {
    localStorage.setItem(AuthService.LS_FIELD, apiKey);
  }

  public logout() {
    localStorage.removeItem(AuthService.LS_FIELD);
  }
}
