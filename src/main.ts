import {bootstrapApplication} from '@angular/platform-browser';
import {importProvidersFrom} from '@angular/core';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

//Cela permet de démarrer correctement votre application en utilisant un composant autonome
//qui est le composant racine de votre application
//utiliser bootstrapApplication pour démarrer directement l'application avec AppComponent
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    appConfig.providers
  ]
}).catch(err => console.error(err));
