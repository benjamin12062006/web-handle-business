# Navigate Business · Angular

Página de desarrollo para probar Firebase Authentication y la cuenta interna de la API Rust.

## Preparación

```bash
pnpm install --frozen-lockfile
cp .env.example .env  # solo si aún no tienes .env
pnpm start
```

Abre [http://localhost:4200/auth-test](http://localhost:4200/auth-test).
La API configurada para esta etapa es **http://127.0.0.1:8081**. El frontend hace peticiones directas; su origen debe estar permitido por CORS en la API.

En `.env`, completa los datos **de la aplicación web** de tu proyecto Firebase:

```dotenv
PUBLIC_FIREBASE_API_KEY=
PUBLIC_FIREBASE_AUTH_DOMAIN=
PUBLIC_FIREBASE_PROJECT_ID=
PUBLIC_FIREBASE_APP_ID=
PUBLIC_API_BASE_URL=http://127.0.0.1:8081
```

Los nombres PUBLIC_ son una convención del proyecto. `config:generate` lee `.env` mediante Node y crea `src/environments/environment.generated.ts` usando únicamente esas variables. Este archivo y `.env` quedan ignorados por Git. Nunca pongas claves privadas de Firebase Admin, ADC o contraseñas de base de datos aquí: los valores de esta configuración son públicos en la aplicación web compilada.

Si los campos Firebase están vacíos, la página los enumera y desactiva el login; **Consultar sin Bearer** sigue disponible. No se crea una sesión de ejemplo. Formatos inválidos de URL, dominio o proyecto detienen la generación y retiran una salida anterior. Cambiar `.env` requiere reiniciar `pnpm start` para regenerar la configuración. Node da prioridad a variables del proceso que ya estén definidas.

En Firebase Authentication habilita **Google** y autoriza `localhost`. El projectId web debe coincidir con `FIREBASE_PROJECT_ID` del backend. En la API, permite `http://localhost:4200` en `CORS_ALLOWED_ORIGINS`. `PUBLIC_API_BASE_URL` es solo el origen, sin `/v1`, path, query ni credenciales. No se modificó la configuración del backend. Se corrigió su composición CORS para incluir los errores de auth; reinicia la API con tu comando habitual antes del recorrido. El proceso que estaba abierto en 8081 mantiene la versión anterior hasta reiniciarlo.

## Recorrido de comprobación manual

1. Pulsa **Consultar sin Bearer**: se espera HTTP 401 `invalid_token`, incluso si hay una sesión local.
2. Pulsa **Continuar con Google** y selecciona tu cuenta.
3. Si esa identidad nunca se sincronizó, **Consultar mi cuenta** debe devolver 404 `account_not_synced`. No borres una cuenta existente para producir ese caso.
4. **Sincronizar cuenta** devuelve 201 si era nueva o 200 si ya existía. Repetir debe devolver 200 y conservar `account_id`.
5. **Consultar mi cuenta** devuelve 200 con la misma cuenta.
6. Recarga para comprobar restauración de sesión; **Cerrar sesión** debe limpiar cuenta y resultados. El cierre local no revoca por sí mismo los tokens ya emitidos en el backend.

El frontend obtiene el Firebase ID token con el SDK y solo lo adjunta a `/v1/auth/sync` y `/v1/auth/me` del origen configurado. Un 401 permite una renovación y un segundo intento como máximo. Los errores de API no cierran Firebase automáticamente. No hay registro con contraseña propio ni comunicación directa con SurrealDB.

La revisión visual y el ensayo de la sesión Google corresponden al usuario. La verificación del agente se realiza sin navegador.

## Organización de la página

La feature vive en `src/app/auth`. Los servicios de sesión/API y el interceptor se mantienen allí. Dentro de `pages/auth-test`, cada bloque visual tiene una carpeta temática con su TypeScript y HTML juntos:

```text
auth-test/
├── auth-test-page.ts / .html            # composición y conexión de eventos
├── auth-test.models.ts                  # acciones y resumen de usuario de la vista
├── configuration-notice/                # campos pendientes y aviso de Firebase
├── firebase-session/                    # sesión y botones de acceso/salida
├── application-account/                 # sincronización, consulta y datos de cuenta
├── api-diagnostic/                      # prueba sin Bearer y último resultado
└── state/
    ├── auth-test-state.ts               # estado y coordinación de las operaciones
    ├── auth-test-state.spec.ts          # regresiones de cancelación y cambio de identidad
    └── auth-error-message.ts            # mensajes seguros de SDK/HTTP
```

Los cuatro componentes reciben datos con `input()` y notifican acciones con `output()`. La página conecta esas acciones a `AuthTestState`, que se provee localmente en su componente: al abandonar la página se destruye y cancela el trabajo pendiente. Los componentes visuales no llaman directamente a Firebase ni a la API.

[Decisión y verificación de la reorganización](bitacora-construccion/03-organizar-pagina-auth-en-componentes.md).

## Comandos

```bash
pnpm build
pnpm test --watch=false
pnpm watch
pnpm run config:generate
```

Los scripts start/build/watch/test regeneran la configuración primero. Si ejecutas `pnpm ng ...` directamente, genera la configuración previamente. Las pruebas usan dobles de sesión/HTTP y no requieren cuentas de usuario, Google, ni una base real. El generador se comprueba con valores sintéticos aislados.

[Plan de auth](docs/plans/auth/02-implementar-pagina-prueba-auth.md) · [Bitácora de implementación](bitacora-construccion/02-pagina-prueba-auth-firebase.md) · [Fuentes y reconstrucciones](docs/fonts/auth/03-reconstrucciones-ejecutadas-auth.md).
