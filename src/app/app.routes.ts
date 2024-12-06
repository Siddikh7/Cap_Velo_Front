import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";

export const routes: Routes = [
  { path: 'velos', loadComponent: () => import('./components/table-test/table-test.component').then(m => m.TableTestComponent) },
  { path: '', redirectTo: '/velos', pathMatch: 'full' }, // Redirection vers 'velos' par défaut
  { path: '**', redirectTo: '/velos' }, // Redirection pour les routes non trouvées
  { path: 'reservations', loadComponent:() => import('./components/reservation/reservation.component').then(m => m.ReservationComponent)}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes{}
