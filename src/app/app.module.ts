import { NgModule } from "@angular/core";
import {AppComponent} from "./app.component";
import {VeloComponent} from "../components/velo/velo.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing/app-routing.module";

//Ce fichier configure le module principal de votre application, importe les modules nécessaires,
// déclare les composants et définit le composant de démarrage.
@NgModule({
  declarations: [
    VeloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
