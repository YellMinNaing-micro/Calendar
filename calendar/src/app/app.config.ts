import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideHttpClient(withFetch(),
      withInterceptors([
        // httpErrorHandlerInterceptor,
        // httpRequestHeaderInterceptor,
        // authInterceptorFn,
      ])),
    MessageService,
    provideAnimationsAsync(),
  ]
};
