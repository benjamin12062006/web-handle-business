import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { FIREBASE_AUTH } from '../../core/firebase/firebase.providers';
import { SessionError, SessionState } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class FirebaseSessionService {
  private readonly auth = inject(FIREBASE_AUTH);
  private readonly currentUser = signal<User | null>(null);
  private readonly currentState = signal<SessionState>('checking');
  private readonly revision = signal(0);
  private closing = false;
  private resolveReady!: () => void;
  private readonly ready = new Promise<void>((resolve) => {
    this.resolveReady = resolve;
  });
  readonly user = this.currentUser.asReadonly();
  readonly state = this.currentState.asReadonly();
  readonly generation = this.revision.asReadonly();

  constructor() {
    const destroy = inject(DestroyRef);
    if (!this.auth) {
      this.currentState.set('unavailable');
      this.resolveReady();
      return;
    }
    const unsubscribe = onAuthStateChanged(
      this.auth,
      (user) => {
        if (!this.closing) this.acceptUser(user);
        this.resolveReady();
      },
      () => {
        this.currentUser.set(null);
        this.revision.update((value) => value + 1);
        this.currentState.set('unavailable');
        this.resolveReady();
      },
    );
    destroy.onDestroy(unsubscribe);
  }

  private acceptUser(user: User | null) {
    if (this.currentUser()?.uid !== user?.uid) this.revision.update((value) => value + 1);
    this.currentUser.set(user);
    this.currentState.set(user ? 'signed-in' : 'signed-out');
  }

  loginWithGoogle() {
    if (!this.auth || this.closing) return Promise.reject(new SessionError('session_unavailable'));
    // Invocar directamente desde click: no esperar HTTP antes de abrir el popup.
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async getIdToken(forceRefresh = false): Promise<string> {
    await this.ready;
    const user = this.currentUser();
    const generation = this.revision();
    if (!user || this.closing || this.state() !== 'signed-in')
      throw new SessionError('session_unavailable');
    const token = await user.getIdToken(forceRefresh);
    if (generation !== this.revision() || this.currentUser()?.uid !== user.uid || this.closing) {
      throw new SessionError('session_changed');
    }
    return token;
  }

  async logout() {
    if (!this.auth) return;
    this.closing = true;
    this.revision.update((value) => value + 1);
    this.currentUser.set(null);
    this.currentState.set('checking');
    try {
      await signOut(this.auth);
    } finally {
      this.closing = false;
      this.acceptUser(this.auth.currentUser);
    }
  }
}
