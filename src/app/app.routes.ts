import { Routes } from '@angular/router';
import {AuthComponent} from './components/pages/auth/auth.component';
import {DashboardComponent} from './components/ui/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
];
