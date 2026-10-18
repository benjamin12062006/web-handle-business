import { TestBed } from '@angular/core/testing';
import { Auth, User } from 'firebase/auth';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FIREBASE_AUTH } from '../../core/firebase/firebase.providers';
import { FirebaseSessionService } from './firebase-session.service';

const sdk = vi.hoisted(() => ({
  observer: null as ((user: User | null) => void) | null,
  unsubscribe: vi.fn(),
  popup: vi.fn(),
  logout: vi.fn(),
}));
vi.mock('firebase/auth', () => ({
  GoogleAuthProvider: class {},
  onAuthStateChanged: vi.fn((_auth, observer) => {
    sdk.observer = observer;
    return sdk.unsubscribe;
  }),
  signInWithPopup: (...args: unknown[]) => sdk.popup(...args),
  signOut: (...args: unknown[]) => sdk.logout(...args),
  getAuth: vi.fn(),
}));

describe('FirebaseSessionService', () => {
  let auth: { currentUser: User | null };
  beforeEach(() => {
    vi.clearAllMocks();
    sdk.observer = null;
    auth = { currentUser: null };
    TestBed.configureTestingModule({
      providers: [{ provide: FIREBASE_AUTH, useValue: auth as Auth }],
    });
  });
  it('abandona checking con la primera notificación sin usuario', () => {
    const service = TestBed.inject(FirebaseSessionService);
    expect(service.state()).toBe('checking');
    sdk.observer!(null);
    expect(service.state()).toBe('signed-out');
    TestBed.resetTestingModule();
    expect(sdk.unsubscribe).toHaveBeenCalled();
  });
  it('un token obtenido para una sesión anterior se descarta', async () => {
    let resolve!: (token: string) => void;
    const user = {
      uid: 'first',
      getIdToken: vi.fn(() => new Promise<string>((done) => (resolve = done))),
    } as unknown as User;
    const service = TestBed.inject(FirebaseSessionService);
    sdk.observer!(user);
    const pending = service.getIdToken();
    await Promise.resolve();
    sdk.observer!({ uid: 'second' } as User);
    resolve('old-token');
    await expect(pending).rejects.toMatchObject({ code: 'session_changed' });
  });
  it('cerrar sesión limpia la identidad y llama signOut sin API propia', async () => {
    const service = TestBed.inject(FirebaseSessionService);
    auth.currentUser = { uid: 'first' } as User;
    sdk.observer!(auth.currentUser);
    sdk.logout.mockImplementation(async () => {
      auth.currentUser = null;
      sdk.observer!(null);
    });
    await service.logout();
    expect(service.user()).toBeNull();
    expect(service.state()).toBe('signed-out');
    expect(sdk.logout).toHaveBeenCalledWith(auth);
  });
  it('configuración ausente deja Firebase inactivo sin sesión ficticia', async () => {
    TestBed.overrideProvider(FIREBASE_AUTH, { useValue: null });
    const service = TestBed.inject(FirebaseSessionService);
    expect(service.state()).toBe('unavailable');
    await expect(service.getIdToken()).rejects.toMatchObject({ code: 'session_unavailable' });
    expect(sdk.observer).toBeNull();
  });
});
