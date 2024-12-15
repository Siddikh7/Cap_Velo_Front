import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {FormComponent} from "./components/form/form.component";

export const routes: Routes = [
  { path: 'carte', loadComponent: () => import('./components/map/map.component').then(m => m.MapComponent) },
  { path: 'velos', loadComponent: () => import('./components/table-test/table-test.component').then(m => m.TableTestComponent) },
  { path: 'reservations', loadComponent: () => import('./components/reservation/reservation.component').then(m => m.ReservationComponent) },
  {path: 'form', loadComponent: () => import('./components/form/form.component').then(m => m.FormComponent) },
  //{ path: '', redirectTo: '/carte', pathMatch: 'full' },
  //{ path: '**', redirectTo: '/carte' },
  {path: 'form/:id', loadComponent: () => import('./components/form/form.component').then(m => m.FormComponent) },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes{}
