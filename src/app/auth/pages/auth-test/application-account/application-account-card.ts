import { Component, input, output } from '@angular/core';
import { AccountResponse, SessionState } from '../../../models/auth.models';
import { AuthTestAction } from '../auth-test.models';

@Component({
  selector: 'app-application-account-card',
  host: { class: 'block' },
  templateUrl: './application-account-card.html',
})
export class ApplicationAccountCard {
  readonly sessionState = input.required<SessionState>();
  readonly account = input.required<AccountResponse | null>();
  readonly pending = input.required<AuthTestAction | null>();
  readonly syncRequested = output<void>();
  readonly currentRequested = output<void>();
}
