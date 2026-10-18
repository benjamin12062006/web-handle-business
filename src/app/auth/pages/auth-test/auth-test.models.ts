export type AuthTestAction = 'login' | 'sync' | 'me' | 'without-token' | 'logout';

export interface SessionUserSummary {
  displayName: string | null;
  email: string | null;
}
