import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@app/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public themeClass: string = null;

  constructor(private settingsService: SettingsService) {
    this.themeClass = this.settingsService.getThemeClass();
  }

  ngOnInit() {
    this.settingsService.getObservableSettings().subscribe((settings) => {
      this.themeClass = SettingsService.classFromTheme(settings.theme);
    });
  }
}
