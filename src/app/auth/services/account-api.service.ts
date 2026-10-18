import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { APP_PUBLIC_CONFIG } from '../../core/config/public-config';
import { BYPASS_FIREBASE_AUTH } from '../interceptors/firebase-token.interceptor';
import { AccountContractError, AccountResponse } from '../models/auth.models';

function validateAccount(response: HttpResponse<unknown>): HttpResponse<AccountResponse> {
  const value = response.body as Partial<AccountResponse> | null;
  if (
    !value ||
    typeof value.account_id !== 'string' ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value.account_id) ||
    typeof value.created_at !== 'string' ||
    !Number.isFinite(Date.parse(value.created_at))
  ) {
    throw new AccountContractError(response.status);
  }
  return response.clone({ body: { account_id: value.account_id, created_at: value.created_at } });
}

@Injectable({ providedIn: 'root' })
export class AccountApiService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_PUBLIC_CONFIG);
  sync() {
    return this.http
      .post<unknown>(`${this.config.apiBaseUrl}/v1/auth/sync`, null, { observe: 'response' })
      .pipe(map(validateAccount));
  }
  current() {
    return this.http
      .get<unknown>(`${this.config.apiBaseUrl}/v1/auth/me`, { observe: 'response' })
      .pipe(map(validateAccount));
  }
  currentWithoutBearer() {
    return this.http
      .get<unknown>(`${this.config.apiBaseUrl}/v1/auth/me`, {
        observe: 'response',
        context: new HttpContext().set(BYPASS_FIREBASE_AUTH, true),
      })
      .pipe(map(validateAccount));
  }
}
