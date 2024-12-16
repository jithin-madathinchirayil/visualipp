import { Component } from '@angular/core';
import { APP_DEFAULTS } from '@core/config/app.const';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  icon_string: string = APP_DEFAULTS.APP_ICON;
}
