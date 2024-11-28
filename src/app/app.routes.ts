import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'velos', loadComponent: () => import('./components/table-test/table-test.component').then(m => m.TableTestComponent) },
  { path: '', redirectTo: '/velos', pathMatch: 'full' }, // Redirection vers 'velos' par défaut
  { path: '**', redirectTo: '/velos' } // Redirection pour les routes non trouvées
];
