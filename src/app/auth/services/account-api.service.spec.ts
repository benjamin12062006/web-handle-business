import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { beforeEach, afterEach, describe, expect, it } from 'vitest';
import { APP_PUBLIC_CONFIG } from '../../core/config/public-config';
import { AccountApiService } from './account-api.service';
import { BYPASS_FIREBASE_AUTH } from '../interceptors/firebase-token.interceptor';

const origin = 'http://127.0.0.1:8081';
const account = {
  account_id: '12345678-1234-4234-8234-123456789012',
  created_at: '2026-10-18T00:00:00Z',
};
describe('AccountApiService', () => {
  let api: AccountApiService;
  let backend: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: APP_PUBLIC_CONFIG, useValue: { apiBaseUrl: origin } },
      ],
    });
    api = TestBed.inject(AccountApiService);
    backend = TestBed.inject(HttpTestingController);
  });
  afterEach(() => backend.verify());
  it('sync conserva status, no envía identidad y obtiene una cuenta válida', () => {
    let status = 0;
    api.sync().subscribe((response) => (status = response.status));
    const request = backend.expectOne(`${origin}/v1/auth/sync`);
    expect(request.request.body).toBeNull();
    request.flush(account, { status: 201, statusText: 'Created' });
    expect(status).toBe(201);
  });
  it('me 404 no crea ni sincroniza una cuenta', () => {
    let status = 0;
    api.current().subscribe({ error: (error) => (status = error.status) });
    backend
      .expectOne(`${origin}/v1/auth/me`)
      .flush({ error: 'account_not_synced' }, { status: 404, statusText: 'Not Found' });
    backend.expectNone(`${origin}/v1/auth/sync`);
    expect(status).toBe(404);
  });
  it('un 2xx con body inválido no es una cuenta aceptada', () => {
    let message = '';
    api.current().subscribe({ error: (error) => (message = error.message) });
    backend.expectOne(`${origin}/v1/auth/me`).flush({ account_id: 'wrong', created_at: 'wrong' });
    expect(message).toBe('unexpected_account_response');
  });
  it('el diagnóstico negativo marca el contexto explícitamente', () => {
    api.currentWithoutBearer().subscribe();
    const request = backend.expectOne(`${origin}/v1/auth/me`);
    expect(request.request.context.get(BYPASS_FIREBASE_AUTH)).toBe(true);
    request.flush(account);
  });
});
