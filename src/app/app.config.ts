import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpClient, HttpClientModule, provideHttpClient} from "@angular/common/http";
import {VeloService} from "./services/velo.service";
import {UtilisateurService} from "./services/utilisateur.service";
import {ReservationService} from "./services/reservation.service";
// import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    VeloService,
  ]
};
