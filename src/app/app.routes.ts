import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('@pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'setup',
        loadComponent: () => import('@pages/application-init/application-init.component').then(m => m.ApplicationInitComponent)
    },
    {
        path: 'builder',
        loadComponent: () => import('@pages/builder/builder.component').then(m => m.BuilderComponent)
    }
];
