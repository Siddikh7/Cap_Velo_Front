import {bootstrapApplication, platformBrowser} from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

//Cela permet de démarrer correctement votre application en utilisant un composant autonome
//qui est le composant racine de votre application
//utiliser bootstrapApplication pour démarrer directement l'application avec AppComponent
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
