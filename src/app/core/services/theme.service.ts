import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  static LS_FIELD = 'theme';
  private theme: BehaviorSubject<Theme>;

  public static classFromTheme(theme: Theme): string {
    switch (theme) {
      case Theme.DARK: return 'kiosk-dark-theme';
      default: return 'kiosk-light-theme';
    }
  }

  constructor() {
    this.theme = new BehaviorSubject<Theme>(
      localStorage.getItem(ThemeService.LS_FIELD) as Theme
    );
  }

  public setTheme(theme: Theme) {
    this.theme.next(theme);
    localStorage.setItem(ThemeService.LS_FIELD, this.theme.value.toString());
  }

  public getTheme(): Observable<Theme> {
    return this.theme;
  }

  public getClass(): string {
    return ThemeService.classFromTheme(this.theme.value);
  }
}
