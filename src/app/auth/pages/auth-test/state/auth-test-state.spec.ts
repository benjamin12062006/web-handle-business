import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { signal } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { APP_PUBLIC_CONFIG } from '../../../../core/config/public-config';
import { AccountResponse } from '../../../models/auth.models';
import { AccountApiService } from '../../../services/account-api.service';
import { FirebaseSessionService } from '../../../services/firebase-session.service';
import { AuthTestState } from './auth-test-state';

const account = {
  account_id: '12345678-1234-4234-8234-123456789012',
  created_at: '2026-10-18T00:00:00Z',
};
describe('AuthTestState (sin navegador)', () => {
  let state: AuthTestState;
  let api: {
    sync: ReturnType<typeof vi.fn>;
    current: ReturnType<typeof vi.fn>;
    currentWithoutBearer: ReturnType<typeof vi.fn>;
  };
  let session: {
    generation: ReturnType<typeof signal<number>>;
    state: ReturnType<typeof signal<string>>;
    user: ReturnType<typeof signal<null>>;
    logout: ReturnType<typeof vi.fn>;
    loginWithGoogle: ReturnType<typeof vi.fn>;
  };
  beforeEach(() => {
    api = { sync: vi.fn(), current: vi.fn(), currentWithoutBearer: vi.fn() };
    session = {
      generation: signal(0),
      state: signal('signed-in'),
      user: signal(null),
      logout: vi.fn().mockResolvedValue(undefined),
      loginWithGoogle: vi.fn(),
    };
    TestBed.configureTestingModule({
      providers: [
        {
          provide: APP_PUBLIC_CONFIG,
          useValue: { apiBaseUrl: 'http://127.0.0.1:8081', missing: [] },
        },
        { provide: AccountApiService, useValue: api },
        { provide: FirebaseSessionService, useValue: session },
      ],
    });
    state = TestBed.runInInjectionContext(() => new AuthTestState());
    TestBed.tick();
  });
  it('503 finaliza la acción sin cerrar Firebase ni conservar una cuenta anterior', () => {
    state.account.set(account);
    api.current.mockReturnValue(
      throwError(
        () => new HttpErrorResponse({ status: 503, error: { error: 'storage_unavailable' } }),
      ),
    );
    state.current();
    expect(state.pending()).toBeNull();
    expect(state.account()).toBeNull();
    expect(state.diagnostic()?.status).toBe(503);
    expect(session.logout).not.toHaveBeenCalled();
  });
  it('salir cancela el trabajo y ninguna respuesta tardía recupera la cuenta', async () => {
    const source = new Subject<HttpResponse<AccountResponse>>();
    let cancelled = false;
    api.current.mockReturnValue(
      new Observable<HttpResponse<AccountResponse>>((observer) => {
        const subscription = source.subscribe(observer);
        return () => {
          cancelled = true;
          subscription.unsubscribe();
        };
      }),
    );
    state.current();
    await state.logout();
    source.next(new HttpResponse({ body: account }));
    expect(cancelled).toBe(true);
    expect(state.account()).toBeNull();
    expect(state.diagnostic()).toBeNull();
    expect(state.pending()).toBeNull();
  });
  it('el cambio de identidad descarta resultados que llegan antes del efecto', () => {
    const source = new Subject<HttpResponse<AccountResponse>>();
    api.sync.mockReturnValue(source);
    state.sync();
    session.generation.set(1);
    source.next(new HttpResponse({ body: account }));
    expect(state.account()).toBeNull();
    TestBed.tick();
    expect(state.pending()).toBeNull();
  });
  it('cancelar el popup deja la acción lista para otro intento', async () => {
    session.loginWithGoogle.mockRejectedValue({ code: 'auth/popup-closed-by-user' });
    await state.login();
    expect(state.pending()).toBeNull();
    expect(state.notice()).toContain('canceló');
  });
  it('un cambio de identidad durante signOut no borra su error ni libera la acción antes de tiempo', async () => {
    let reject!: (error: unknown) => void;
    session.logout.mockReturnValue(new Promise<void>((_resolve, fail) => (reject = fail)));
    const closing = state.logout();
    session.generation.set(1);
    TestBed.tick();
    expect(state.pending()).toBe('logout');
    reject(new Error('failed'));
    await closing;
    expect(state.pending()).toBeNull();
    expect(state.notice()).not.toBe('');
  });
});
