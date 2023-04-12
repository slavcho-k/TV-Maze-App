import { Component } from '@angular/core';
import { ThemeService } from './theme.service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tvMazeApp';

  constructor(protected themeService: ThemeService) {}

  toggleMode(): void {
  }
}
