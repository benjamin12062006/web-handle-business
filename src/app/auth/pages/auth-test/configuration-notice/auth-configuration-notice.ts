import { Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-configuration-notice',
  host: { class: 'block' },
  templateUrl: './auth-configuration-notice.html',
})
export class AuthConfigurationNotice {
  readonly missingFields = input.required<readonly string[]>();
  readonly unavailable = input.required<boolean>();
}
