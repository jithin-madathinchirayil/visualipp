import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  host:{
    class:"w-full h-16 flex items-center justify-between px-4 bg-white border-b border-gray-100"
  }
})
export class NavbarComponent {

}
