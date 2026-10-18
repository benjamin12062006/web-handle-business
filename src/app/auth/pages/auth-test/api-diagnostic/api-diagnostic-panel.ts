import { Component, input, output } from '@angular/core';
import { Diagnostic } from '../../../models/auth.models';
import { AuthTestAction } from '../auth-test.models';

@Component({
  selector: 'app-api-diagnostic-panel',
  host: { class: 'block' },
  templateUrl: './api-diagnostic-panel.html',
})
export class ApiDiagnosticPanel {
  readonly apiBaseUrl = input.required<string>();
  readonly pending = input.required<AuthTestAction | null>();
  readonly notice = input.required<string>();
  readonly diagnostic = input.required<Diagnostic | null>();
  readonly withoutTokenRequested = output<void>();
}
