import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { APP_PUBLIC_CONFIG } from '../../../core/config/public-config';
import { AuthTestState } from './state/auth-test-state';

@Component({
  selector: 'app-auth-test-page',
  imports: [DatePipe],
  providers: [AuthTestState],
  templateUrl: './auth-test-page.html',
})
export class AuthTestPage {
  protected readonly config = inject(APP_PUBLIC_CONFIG);
  protected readonly state = inject(AuthTestState);
}
