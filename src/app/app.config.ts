import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {VeloService} from "./services/velo.service";
import {UtilisateurService} from "./services/utilisateur.service";
import {ReservationService} from "./services/reservation.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    VeloService,
  ]
};
