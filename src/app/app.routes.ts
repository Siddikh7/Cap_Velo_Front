import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'velos', loadComponent: () => import('./components/table-test/table-test.component').then(m => m.TableTestComponent) },
  { path: 'reservations', loadComponent: () => import('./components/reservation/reservation.component').then(m => m.ReservationComponent) },
{ path: 'carte', loadComponent: () => import('./components/map/map.component').then(m => m.MapComponent) },
  { path: '', redirectTo: '/velos', pathMatch: 'full' },
  { path: '**', redirectTo: '/velos' }
];
