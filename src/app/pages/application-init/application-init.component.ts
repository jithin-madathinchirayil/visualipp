import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoComponent } from '@shared/components/logo/logo.component';

@Component({
  selector: 'app-application-init',
  standalone: true,
  imports: [
    LogoComponent
  ],
  templateUrl: './application-init.component.html',
  styleUrl: './application-init.component.scss',
  host: {
    class: 'flex flex-col items-center justify-center w-full h-full'
  }
})
export class ApplicationInitComponent implements OnInit {
  private router: Router = inject(Router);

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/builder']);
    }, 1200);
  }

  
}
