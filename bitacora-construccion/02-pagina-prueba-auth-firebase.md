# 02 — Página de prueba de Firebase y cuenta Rust

Fecha de creación: 2026-10-18
Estado: Implementado y verificado técnicamente; aceptación real Firebase y reinicio de API pendientes
Ámbito: frontend, autenticación y diagnóstico de API
Relacionada con: [plan dos](../docs/plans/auth/02-implementar-pagina-prueba-auth.md), [reconstrucciones](../docs/fonts/auth/03-reconstrucciones-ejecutadas-auth.md), [contrato y fuentes oficiales](../docs/fonts/auth/02-documentacion-oficial-y-contrato-auth.md), [base Angular](01-base-angular-tailwind.md), [corrección CORS del backend](../../backend/bitacora-construccion/04-cors-en-errores-auth.md)
Revisión backend de partida: `1c416da8da2e6b0d5970d138ce3d34951ab6eda6`. Frontend sin repositorio Git propio.

## Necesidad y punto de partida

Ejecutar el plan dos con la API indicada por el usuario en http://127.0.0.1:8081. La aplicación tenía una pantalla inicial, Angular 22.2.2 y Tailwind; no tenía SDK ni sesión Firebase. Se preservaron los archivos de estudio no versionados del backend.

## Evidencia, interpretación y adaptación

Las señales y su lectura proceden de los originales F1/F5 y sus guías R1/R5; clonación y registro del interceptor de F7/F8 y R7/R8; observación del status HTTP de F10/R10 y manejo de errores de F11/R11. El [registro de reconstrucciones](../docs/fonts/auth/03-reconstrucciones-ejecutadas-auth.md) enlaza conjuntamente originales, guías, fases, símbolos y límites; no se copiaron los tipos ausentes de los proyectos iniciales.

Las fuentes oficiales F17–F22 de la [ficha de contrato](../docs/fonts/auth/02-documentacion-oficial-y-contrato-auth.md) fundamentan Google mediante SDK, observador de sesión, getIdToken y composición HTTP. Se reconsultaron el 2026-10-18 [Firebase Google sign-in](https://firebase.google.com/docs/auth/web/google-signin), [getIdToken](https://firebase.google.com/docs/reference/js/auth) y [Angular Interceptors](https://angular.dev/guide/http/interceptors). El registro npm informó Firebase 13.0.0; se fijó esa versión, sin actualizar Angular/RxJS/Tailwind.

**Adaptación propia:** separar sesión Firebase de cuenta Rust, token asíncrono restringido al origen/rutas, un solo reintento 401, bypass de diagnóstico, cancelación por generación de identidad y finalize. Un 503 de API no cierra la sesión Firebase. No se adopta el JWT/contraseña ni el rxResource histórico del curso.

## Implementación

| Decisión | Archivo y símbolos | Funcionamiento |
| --- | --- | --- |
| Configuración pública explícita | [generador](../scripts/generate-environment.mjs), publicConfig/generate; [.env.example](../.env.example); [PublicConfig](../src/app/core/config/public-config.ts) | Lee cinco variables con Node --env-file, permite únicamente esos campos y genera TypeScript con JSON.stringify. API actual 8081. .env y generado ignorados. |
| SDK separado de HTTP | [provider](../src/app/core/firebase/firebase.providers.ts), FIREBASE_AUTH; [servicio](../src/app/auth/services/firebase-session.service.ts), FirebaseSessionService | Un Auth raíz, onAuthStateChanged, loginWithGoogle, getIdToken, logout. Sin llamada a la API propia desde este servicio. |
| Credencial restringida | [interceptor](../src/app/auth/interceptors/firebase-token.interceptor.ts), firebaseTokenInterceptor/BYPASS_FIREBASE_AUTH | Compara origen y path exactos, usa headers.set, comprueba generación y renueva una sola vez tras 401. Bypass elimina incluso una cabecera previa. |
| Contrato propio | [cliente](../src/app/auth/services/account-api.service.ts), AccountApiService; [modelos](../src/app/auth/models/auth.models.ts) | POST sync sin identidad en body, GET me, HttpResponse y comprobación pequeña del DTO de cuenta. Me no sincroniza implícitamente. |
| Página mínima | [AuthTestPage](../src/app/auth/pages/auth-test/auth-test-page.ts), [plantilla](../src/app/auth/pages/auth-test/auth-test-page.html), [rutas](../src/app/app.routes.ts) | /auth-test, login Google, sync/me separados, consulta sin Bearer y salida. Estado de sesión, cuenta, acción y diagnóstico separados. Cancela y descarta resultados anteriores al cambiar identidad. |

**Ajuste del plan por configuración pendiente:** crear .env con cuatro valores Firebase vacíos no impide compilar ni abrir la página. El generador declara firebase=null y los nombres faltantes; no inicializa un SDK ni fabrica un usuario. El login queda deshabilitado y la prueba negativa de API sigue disponible. Formatos inválidos sí terminan con error y eliminan el generado anterior. Esto permite al usuario completar sus campos después de recibir una implementación verificable.

**Ajuste necesario de integración:** una petición real con Origin mostró 401 sin Access-Control-Allow-Origin. Se corrigió puntualmente el orden recover/CORS en el backend y se añadió una regresión independiente. [Evidencia y comprobación](../../backend/bitacora-construccion/04-cors-en-errores-auth.md). No se cambiaron Firebase, contratos de cuenta ni datos. El servidor del usuario no se detuvo/reinició.

## Comprobaciones ejecutadas

| Ejecución | Resultado |
| --- | --- |
| pnpm install --frozen-lockfile --offline | Correcto al terminar. Lockfile reproducible. Se marcaron false los scripts opcionales @firebase/util y protobufjs; se usa configuración Firebase explícita, no autoconfiguración postinstall. |
| pnpm build | Producción correcta: 353.12 kB iniciales y página lazy 12.62 kB; dentro de presupuestos. El primer intento en sandbox abortó con 134; el mismo comando fuera del sandbox terminó correctamente. |
| pnpm test --watch=false | 4 pruebas Node del generador y 21 de Angular correctas (25 total). Dobles de SDK/HTTP; no prueban un login real. |
| API real 8081 por curl | Health 200, preflight permitido para localhost:4200, me y sync sin token 401 invalid_token/no-store. Con Origin, el proceso antiguo omite allow-origin en el 401; requiere reinicio tras la corrección. |
| Frontend por HTTP | /auth-test devuelve 200 en localhost:4200. Se reutilizó el servidor ya existente de este mismo frontend; no se creó ni detuvo otro. No implica revisión visual. |
| Regresión CORS de Rust | Falló primero por header ausente; después de la corrección pasaron el test nuevo y los cinco tests auth_http existentes. Cargo check, Clippy con -D warnings y formato dirigido también correctos; detalle en bitácora del backend. |
| Formato frontend | Prettier correcto en src/app, scripts, package.json y pnpm-workspace.yaml. La comprobación ampliada señaló src/main.ts y src/index.html, archivos previos ajenos al cambio que se conservaron. |

Las pruebas comprueban allowlist/serialización del generador, estado sin configuración, destino de credencial, bypass, dos intentos máximos, ausencia de renovación en 503, DTO/status, cierre/cambio de identidad y respuestas tardías. También cubren cancelación de popup y no finalizar signOut prematuramente ante cambios de identidad.

## Pendientes y recorrido del usuario

1. Completar las cuatro variables públicas Firebase de [.env](../.env) con su app web y reiniciar pnpm start.
2. Habilitar Google y autorizar localhost en Firebase; projectId debe coincidir con el backend.
3. Reiniciar su API para servir la corrección CORS; no se tomó control de su proceso.
4. Comprobar visualmente y probar Google → consultar antes de sync si la identidad es nueva → sync/repetición → me → recargar → salir. [Instrucciones](../README.md).

Se aplicó [no-usar-navegador](/Users/benji/.agents/skills/no-usar-navegador/SKILL.md): no hubo navegador, captura, inspección de página ni sesión real de usuario por parte del agente. Las pruebas Angular usan un entorno unitario simulado. No se afirma que se haya aceptado el login real o el resultado visual.
