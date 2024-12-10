import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'carte', loadComponent: () => import('./components/map/map.component').then(m => m.MapComponent) },
  { path: 'velos', loadComponent: () => import('./components/table-test/table-test.component').then(m => m.TableTestComponent) },
  { path: 'reservations', loadComponent: () => import('./components/reservation/reservation.component').then(m => m.ReservationComponent) },
{path: 'form', loadComponent: () => import('./components/form/form.component').then(m => m.FormComponent) },
{ path: '', redirectTo: '/carte', pathMatch: 'full' },
  { path: '**', redirectTo: '/carte' }
];
