import { Routes } from '@angular/router';
import { LoginComponent } from './auth/auth-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { AuthGuard } from './guards/auth.guard'; // Importar o guarda

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Adicionar o guarda
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Rota padrão do dashboard
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
  { path: '**', redirectTo: '/login' },
];
