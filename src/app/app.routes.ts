import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('@pages/builder/builder.component').then(m => m.BuilderComponent)
    }
];
