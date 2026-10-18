import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment.generated';
import { firebaseTokenInterceptor } from './auth/interceptors/firebase-token.interceptor';
import { APP_PUBLIC_CONFIG } from './core/config/public-config';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: APP_PUBLIC_CONFIG, useValue: environment },
    provideHttpClient(withInterceptors([firebaseTokenInterceptor])),
  ],
};
