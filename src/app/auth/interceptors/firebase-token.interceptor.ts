import { HttpContextToken, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, defer, from, switchMap, throwError } from 'rxjs';
import { APP_PUBLIC_CONFIG } from '../../core/config/public-config';
import { SessionError } from '../models/auth.models';
import { FirebaseSessionService } from '../services/firebase-session.service';

export const BYPASS_FIREBASE_AUTH = new HttpContextToken<boolean>(() => false);

export const firebaseTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(APP_PUBLIC_CONFIG);
  const session = inject(FirebaseSessionService);
  if (req.context.get(BYPASS_FIREBASE_AUTH)) {
    return next(req.clone({ headers: req.headers.delete('Authorization') }));
  }
  const url = new URL(req.url, config.apiBaseUrl);
  if (
    url.origin !== config.apiBaseUrl ||
    !['/v1/auth/sync', '/v1/auth/me'].includes(url.pathname)
  ) {
    return next(req);
  }
  return defer(() => {
    const generation = session.generation();
    const authorized = (token: string) => {
      if (generation !== session.generation()) throw new SessionError('session_changed');
      return req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
    };
    return from(session.getIdToken()).pipe(
      switchMap((token) => next(authorized(token))),
      catchError((error: unknown) => {
        if (
          !(error instanceof HttpErrorResponse) ||
          error.status !== 401 ||
          generation !== session.generation()
        ) {
          return throwError(() => error);
        }
        // El error del segundo intento se propaga; no vuelve a entrar en este catchError.
        return from(session.getIdToken(true)).pipe(switchMap((token) => next(authorized(token))));
      }),
    );
  });
};
