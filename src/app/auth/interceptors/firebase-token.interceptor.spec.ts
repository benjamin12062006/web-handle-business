import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpContext, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest';
import { APP_PUBLIC_CONFIG } from '../../core/config/public-config';
import { FirebaseSessionService } from '../services/firebase-session.service';
import { BYPASS_FIREBASE_AUTH, firebaseTokenInterceptor } from './firebase-token.interceptor';

const origin = 'http://127.0.0.1:8081';
describe('firebaseTokenInterceptor', () => {
  let http: HttpClient;
  let backend: HttpTestingController;
  let session: {
    generation: ReturnType<typeof signal<number>>;
    getIdToken: ReturnType<typeof vi.fn>;
  };
  beforeEach(() => {
    session = { generation: signal(0), getIdToken: vi.fn().mockResolvedValue('first-token') };
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([firebaseTokenInterceptor])),
        provideHttpClientTesting(),
        { provide: APP_PUBLIC_CONFIG, useValue: { apiBaseUrl: origin } },
        { provide: FirebaseSessionService, useValue: session },
      ],
    });
    http = TestBed.inject(HttpClient);
    backend = TestBed.inject(HttpTestingController);
  });
  afterEach(() => backend.verify());
  const settle = async () => {
    await Promise.resolve();
    await Promise.resolve();
  };

  it('reemplaza Authorization y conserva método/body para sync', async () => {
    http.post(`${origin}/v1/auth/sync`, null, { headers: { Authorization: 'stale' } }).subscribe();
    await settle();
    const request = backend.expectOne(`${origin}/v1/auth/sync`);
    expect(request.request.headers.getAll('Authorization')).toEqual(['Bearer first-token']);
    expect(request.request.body).toBeNull();
    expect(request.request.method).toBe('POST');
    request.flush({});
  });
  it('no entrega tokens a otro origen, host parecido ni otra ruta', () => {
    for (const url of [
      'https://example.com/v1/auth/me',
      'http://127.0.0.1.evil.test:8081/v1/auth/me',
      `${origin}/v1/auth/me/extra`,
      `${origin}/health`,
    ]) {
      http.get(url).subscribe();
      const request = backend.expectOne(url);
      expect(request.request.headers.has('Authorization')).toBe(false);
      request.flush({});
    }
    expect(session.getIdToken).not.toHaveBeenCalled();
  });
  it('bypass omite la credencial y la renovación aunque exista una cabecera previa', () => {
    let errorStatus = 0;
    http
      .get(`${origin}/v1/auth/me`, {
        context: new HttpContext().set(BYPASS_FIREBASE_AUTH, true),
        headers: { Authorization: 'stale' },
      })
      .subscribe({ error: (error) => (errorStatus = error.status) });
    const request = backend.expectOne(`${origin}/v1/auth/me`);
    expect(request.request.headers.has('Authorization')).toBe(false);
    request.flush({ error: 'invalid_token' }, { status: 401, statusText: 'Unauthorized' });
    expect(errorStatus).toBe(401);
    expect(session.getIdToken).not.toHaveBeenCalled();
  });
  it('renueva una vez y propaga el segundo 401', async () => {
    session.getIdToken.mockResolvedValueOnce('first').mockResolvedValueOnce('renewed');
    let status = 0;
    http.get(`${origin}/v1/auth/me`).subscribe({ error: (error) => (status = error.status) });
    await settle();
    backend
      .expectOne(`${origin}/v1/auth/me`)
      .flush({}, { status: 401, statusText: 'Unauthorized' });
    await settle();
    const retry = backend.expectOne(`${origin}/v1/auth/me`);
    expect(retry.request.headers.get('Authorization')).toBe('Bearer renewed');
    retry.flush({}, { status: 401, statusText: 'Unauthorized' });
    await settle();
    expect(status).toBe(401);
    expect(session.getIdToken.mock.calls).toEqual([[], [true]]);
  });
  it('un 503 no renueva ni cierra sesión', async () => {
    let status = 0;
    http.get(`${origin}/v1/auth/me`).subscribe({ error: (error) => (status = error.status) });
    await settle();
    backend.expectOne(`${origin}/v1/auth/me`).flush({}, { status: 503, statusText: 'Unavailable' });
    expect(status).toBe(503);
    expect(session.getIdToken).toHaveBeenCalledTimes(1);
  });
  it('no envía el token si la identidad cambió mientras se obtenía', async () => {
    let resolve!: (token: string) => void;
    session.getIdToken.mockReturnValue(new Promise<string>((done) => (resolve = done)));
    let code = '';
    http.get(`${origin}/v1/auth/me`).subscribe({ error: (error) => (code = error.code) });
    session.generation.set(1);
    resolve('old-user-token');
    await settle();
    backend.expectNone(`${origin}/v1/auth/me`);
    expect(code).toBe('session_changed');
  });
  it('sin sesión propaga el fallo local sin enviar Bearer null', async () => {
    session.getIdToken.mockRejectedValue(new Error('signed-out'));
    let failed = false;
    http.get(`${origin}/v1/auth/me`).subscribe({ error: () => (failed = true) });
    await settle();
    backend.expectNone(`${origin}/v1/auth/me`);
    expect(failed).toBe(true);
  });
});
