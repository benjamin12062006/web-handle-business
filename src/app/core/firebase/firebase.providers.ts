import { inject, InjectionToken } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { APP_PUBLIC_CONFIG } from '../config/public-config';

export const FIREBASE_AUTH = new InjectionToken<Auth | null>('FIREBASE_AUTH', {
  providedIn: 'root',
  factory: () => {
    const config = inject(APP_PUBLIC_CONFIG);
    if (!config.firebase) return null;
    try {
      return getAuth(initializeApp(config.firebase));
    } catch {
      return null;
    }
  },
});
