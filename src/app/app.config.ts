import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { InMemoryCache } from '@apollo/client/core';
import { ApiConfig } from './services/api.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideClientHydration(), 
    provideHttpClient(), 

    provideApollo(() => {
      const httpLink = inject(HttpLink);

      const authLink = setContext(() => {
        const token = localStorage.getItem('token');
        return {
          headers: {
            Authorization: token ? `Bearer ${token}` : '', 
          },
        };
      });

      return {
        link: authLink.concat(httpLink.create({ uri: ApiConfig['backendUrl'] })),
        cache: new InMemoryCache(),
      };
    })
  ]
};
