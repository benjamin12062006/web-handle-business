import { HttpErrorResponse } from '@angular/common/http';
import { AccountContractError, SessionError } from '../../../models/auth.models';

export function describeAuthError(error: unknown): { status: number | null; message: string } {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0)
      return {
        status: 0,
        message: 'No se pudo contactar con la API. Comprueba el servidor, la red y CORS.',
      };
    const messages: Record<string, string> = {
      invalid_token: 'La API rechazó la credencial (invalid_token).',
      account_not_synced: 'Todavía no existe la cuenta interna. Pulsa Sincronizar cuenta.',
      auth_unavailable: 'El servicio de identidad no está disponible. Puedes volver a intentarlo.',
      storage_unavailable:
        'El almacenamiento de la API no está disponible. La sesión de Firebase se conserva.',
      internal_error: 'La API encontró un error interno.',
      origin_not_allowed: 'La API rechazó el origen de esta página.',
    };
    const code =
      error.error && typeof error.error === 'object' && typeof error.error.error === 'string'
        ? error.error.error
        : '';
    return {
      status: error.status,
      message: messages[code] ?? 'La API devolvió un error inesperado.',
    };
  }
  if (error instanceof AccountContractError)
    return {
      status: error.status,
      message: 'La respuesta de la API no contiene una cuenta válida.',
    };
  if (error instanceof SessionError)
    return {
      status: null,
      message:
        error.code === 'session_changed'
          ? 'La sesión cambió; vuelve a ejecutar la operación.'
          : 'Inicia sesión con Google antes de usar esta acción.',
    };
  const code = error && typeof error === 'object' && 'code' in error ? error.code : '';
  const sdkMessages: Record<string, string> = {
    'auth/popup-closed-by-user': 'Se canceló el inicio de sesión.',
    'auth/cancelled-popup-request': 'Se canceló la ventana de acceso anterior.',
    'auth/popup-blocked':
      'El navegador bloqueó la ventana de Google. Permite el popup y vuelve a intentarlo.',
    'auth/unauthorized-domain': 'Autoriza el dominio de esta página en Firebase Authentication.',
    'auth/operation-not-allowed': 'Habilita el proveedor Google en Firebase Authentication.',
    'auth/network-request-failed': 'No se pudo contactar con Firebase. Revisa tu conexión.',
    'auth/invalid-api-key': 'Revisa PUBLIC_FIREBASE_API_KEY en .env y reinicia el frontend.',
  };
  return {
    status: null,
    message:
      typeof code === 'string' && sdkMessages[code]
        ? sdkMessages[code]
        : 'No se pudo completar la operación con Firebase. Revisa la configuración y vuelve a intentarlo.',
  };
}
