import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '@shared/components/logo/logo.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LogoComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: {
    class: 'w-full h-dvh flex flex-wrap relative'
  }
})
export class HomeComponent {

}
