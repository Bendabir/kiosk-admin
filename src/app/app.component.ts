import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@app/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public themeClass: string = null;

  constructor(private themeService: ThemeService) {
    this.themeClass = this.themeService.getClass();
  }

  ngOnInit() {
    this.themeService.getTheme().subscribe((theme) => {
      this.themeClass = ThemeService.classFromTheme(theme);
    });
  }
}
