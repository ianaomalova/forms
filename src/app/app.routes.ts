import { Routes } from '@angular/router';
import {AuthComponent} from './components/pages/auth/auth.component';
import {AuthGuard} from './auth/auth.guard';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () => import('./components/pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./components/pages/main/main.component').then(m => m.MainComponent),
      },
      {
        path: 'create-form',
        loadComponent: () => import('./components/pages/create-form/create-form.component').then(m => m.CreateFormComponent),
      },
      {
        path: 'profile',
        loadComponent: () => import('./components/pages/profile/profile.component').then(m => m.ProfileComponent),
      }
    ]
  },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
