import { HttpResponse } from '@angular/common/http';
import { Injectable, DestroyRef, effect, inject, signal, untracked } from '@angular/core';
import { finalize, Observable, Subscription } from 'rxjs';
import { AccountResponse, Diagnostic } from '../../../models/auth.models';
import { AccountApiService } from '../../../services/account-api.service';
import { FirebaseSessionService } from '../../../services/firebase-session.service';

import { AuthTestAction } from '../auth-test.models';
import { describeAuthError } from './auth-error-message';

@Injectable()
export class AuthTestState {
  readonly session = inject(FirebaseSessionService);
  private readonly api = inject(AccountApiService);
  readonly pending = signal<AuthTestAction | null>(null);
  readonly account = signal<AccountResponse | null>(null);
  readonly diagnostic = signal<Diagnostic | null>(null);
  readonly notice = signal('');
  private request: Subscription | null = null;
  private operation = 0;

  constructor() {
    effect(() => {
      this.session.generation();
      untracked(() => {
        // Invalidar HTTP sin finalizar prematuramente un popup o signOut en curso.
        this.operation++;
        this.request?.unsubscribe();
        this.request = null;
        this.account.set(null);
        this.diagnostic.set(null);
        if (['sync', 'me', 'without-token'].includes(this.pending() ?? '')) {
          this.pending.set(null);
        }
      });
    });
    inject(DestroyRef).onDestroy(() => this.cancelRequest());
  }

  private cancelRequest() {
    this.operation++;
    this.request?.unsubscribe();
    this.request = null;
    this.pending.set(null);
  }

  private resetIdentity() {
    this.cancelRequest();
    this.account.set(null);
    this.diagnostic.set(null);
    this.notice.set('');
  }

  async login() {
    if (this.pending()) return;
    this.pending.set('login');
    this.notice.set('');
    try {
      await this.session.loginWithGoogle();
      // Automatizamos la sincronización tras un login exitoso
      // Esperamos al próximo tick para que Angular procese los efectos de sesión
      // y no cancele nuestra nueva petición HTTP de sincronización.
      setTimeout(() => {
        if (this.pending() === 'login') this.pending.set(null);
        this.sync();
      }, 0);
    } catch (error) {
      this.notice.set(describeAuthError(error).message);
      if (this.pending() === 'login') this.pending.set(null);
    }
  }

  async logout() {
    this.resetIdentity();
    this.pending.set('logout');
    try {
      await this.session.logout();
    } catch (error) {
      this.notice.set(describeAuthError(error).message);
    } finally {
      if (this.pending() === 'logout') this.pending.set(null);
    }
  }

  sync() {
    this.run('sync', 'POST', '/v1/auth/sync', this.api.sync());
  }
  current() {
    this.run('me', 'GET', '/v1/auth/me', this.api.current());
  }
  withoutToken() {
    this.run('without-token', 'GET', '/v1/auth/me', this.api.currentWithoutBearer());
  }

  private run(
    action: AuthTestAction,
    method: string,
    endpoint: string,
    request: Observable<HttpResponse<AccountResponse>>,
  ) {
    if (this.pending()) return;
    const generation = this.session.generation();
    const operation = ++this.operation;
    this.pending.set(action);
    this.notice.set('');
    const stillCurrent = () =>
      operation === this.operation && generation === this.session.generation();
    this.request = request
      .pipe(
        finalize(() => {
          if (operation === this.operation) this.pending.set(null);
        }),
      )
      .subscribe({
        next: (response) => {
          if (!stillCurrent()) return;
          const account = response.body!;
          // El diagnóstico sin credencial nunca establece una cuenta autenticada.
          if (action !== 'without-token') this.account.set(account);
          this.diagnostic.set({
            method,
            endpoint,
            status: response.status,
            ok: true,
            message:
              action === 'without-token'
                ? 'La API respondió sin Bearer; revisa su configuración.'
                : 'Cuenta recibida correctamente.',
            account,
          });
        },
        error: (error: unknown) => {
          if (!stillCurrent()) return;
          if (action !== 'without-token') this.account.set(null);
          const result = describeAuthError(error);
          this.diagnostic.set({ method, endpoint, ...result, ok: false, account: null });
        },
      });
  }
}
