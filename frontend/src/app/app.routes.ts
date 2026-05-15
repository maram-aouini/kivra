import { Routes } from '@angular/router';
import { Home } from './features/auth/home/home';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { ContentList } from './features/content/content-list/content-list';
import { Overview } from './features/overview/overview';
import { AuthGuard } from './core/auth.guard';
import { GuestGuard } from './core/guest.guard';
import { AdminGuard } from './core/admin.guard';
import { Admin } from './features/admin/admin';
import { Profile } from './features/profile/profile';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login, canActivate: [GuestGuard] },
  { path: 'register', component: Register, canActivate: [GuestGuard] },
  { path: 'overview', component: Overview, canActivate: [AuthGuard] },
  { path: 'contents', component: ContentList, canActivate: [AuthGuard] },
  { path: 'profile', component: Profile, canActivate: [AuthGuard] },
  { path: 'admin', component: Admin, canActivate: [AdminGuard] },
  { path: '**', redirectTo: '' }
];