import { Component, computed, input, output } from '@angular/core';
import { SessionState } from '../../../models/auth.models';
import { AuthTestAction, SessionUserSummary } from '../auth-test.models';

@Component({
  selector: 'app-firebase-session-card',
  host: { class: 'block' },
  templateUrl: './firebase-session-card.html',
})
export class FirebaseSessionCard {
  readonly state = input.required<SessionState>();
  readonly user = input.required<SessionUserSummary | null>();
  readonly pending = input.required<AuthTestAction | null>();
  readonly configurationMissing = input.required<boolean>();
  readonly loginRequested = output<void>();
  readonly logoutRequested = output<void>();

  protected readonly sessionLabel = computed(
    () =>
      ({
        checking: 'Comprobando sesión',
        'signed-out': 'Sin sesión',
        'signed-in': 'Sesión iniciada',
        unavailable: this.configurationMissing()
          ? 'Firebase pendiente de configurar'
          : 'Firebase no disponible',
      })[this.state()],
  );
}
