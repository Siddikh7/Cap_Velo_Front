//on va créer un module de routage pour gérer les routes de notre application
//comme ca on pourra naviguer entre les différentes pages/composants de notre application

import {RouterModule, Routes} from "@angular/router";
import {VeloComponents} from "../../components/velo.components";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {path: 'velos', component: VeloComponents},
  {path: '', redirectTo: '/velos', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
