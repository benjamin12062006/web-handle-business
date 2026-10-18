import { InjectionToken } from '@angular/core';

export interface PublicConfig {
  apiBaseUrl: string;
  firebase: { apiKey: string; authDomain: string; projectId: string; appId: string } | null;
  missing: readonly string[];
}

export const APP_PUBLIC_CONFIG = new InjectionToken<PublicConfig>('APP_PUBLIC_CONFIG');
