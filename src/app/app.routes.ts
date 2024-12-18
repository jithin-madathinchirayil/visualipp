import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('@pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'builder',
        loadComponent: () => import('@pages/builder/builder.component').then(m => m.BuilderComponent)
    }
];
