import { Component, inject } from '@angular/core';
import { APP_PUBLIC_CONFIG } from '../../../core/config/public-config';
import { ApiDiagnosticPanel } from './api-diagnostic/api-diagnostic-panel';
import { ApplicationAccountCard } from './application-account/application-account-card';
import { AuthConfigurationNotice } from './configuration-notice/auth-configuration-notice';
import { FirebaseSessionCard } from './firebase-session/firebase-session-card';
import { AuthTestState } from './state/auth-test-state';

@Component({
  selector: 'app-auth-test-page',
  imports: [
    AuthConfigurationNotice,
    FirebaseSessionCard,
    ApplicationAccountCard,
    ApiDiagnosticPanel,
  ],
  providers: [AuthTestState],
  templateUrl: './auth-test-page.html',
})
export class AuthTestPage {
  protected readonly config = inject(APP_PUBLIC_CONFIG);
  protected readonly state = inject(AuthTestState);
}
