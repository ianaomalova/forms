import { Routes } from '@angular/router';
import {AuthComponent} from './components/pages/auth/auth.component';
import {AuthGuard} from './auth/auth.guard';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard',
    loadComponent: () => import('./components/pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
];
