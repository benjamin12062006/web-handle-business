export type SessionState = 'checking' | 'signed-out' | 'signed-in' | 'unavailable';
export interface AccountResponse {
  account_id: string;
  created_at: string;
}
export interface Diagnostic {
  method: string;
  endpoint: string;
  status: number | null;
  ok: boolean;
  message: string;
  account: AccountResponse | null;
}
export class SessionError extends Error {
  constructor(public readonly code: 'session_unavailable' | 'session_changed') {
    super(code);
  }
}
export class AccountContractError extends Error {
  constructor(public readonly status: number) {
    super('unexpected_account_response');
  }
}
