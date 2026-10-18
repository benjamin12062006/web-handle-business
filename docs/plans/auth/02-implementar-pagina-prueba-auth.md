# 02 — Implementar la página Angular de prueba de Firebase y API Rust

Fecha de creación: 2026-10-17
Última actualización: 2026-10-18
Estado: Implementado y verificado técnicamente; aceptación Firebase real y reinicio API pendientes
Ámbito: una página para aceptar la autenticación del backend existente
Relacionada con: [primer plan ejecutado](01-preparar-reconstrucciones-para-probar-auth.md), [once reconstrucciones y sus límites](../../fonts/auth/03-reconstrucciones-ejecutadas-auth.md), [originales de cursos](../../fonts/auth/01-catalogo-cursos-angular-para-auth.md), [contrato y documentación oficial](../../fonts/auth/02-documentacion-oficial-y-contrato-auth.md), [guía de estudio del backend](../../../../backend/crates/docs/analisis/01-guia-de-estudio-auth-firebase-surrealdb.md), [bitácora del backend](../../../../backend/bitacora-construccion/03-integrar-auth-sin-retirar-backend-existente.md)
Revisión de backend contrastada: `1c416da8da2e6b0d5970d138ce3d34951ab6eda6`; su guía retrospectiva es posterior y está fuera de ese commit. Frontend inspeccionado directamente, sin Git propio detectado.

## Objetivo observable y alcance autorizado de esta entrega

Implementar posteriormente una sola página `/auth-test` que permita iniciar sesión con Google usando Firebase, sincronizar la cuenta propia con Rust, consultar esa cuenta y cerrar sesión. La página debe mostrar qué operación se ejecutó, su resultado HTTP y la cuenta devuelta, sin exponer tokens. Es una herramienta de aceptación del backend; no es un panel de administración ni el resto del producto.

En su preparación del 2026-10-17 este documento solo planificaba la implementación. El usuario autorizó ejecutarlo el 2026-10-18 e indicó la API en http://127.0.0.1:8081. La implementación y sus comprobaciones constan en la [bitácora frontend 02](../../../bitacora-construccion/02-pagina-prueba-auth-firebase.md). Se conserva debajo el diseño previo como contexto histórico.

## Evidencia disponible y qué se adapta

Se crearon y verificaron once guías, una por original. [La ficha 03](../../fonts/auth/03-reconstrucciones-ejecutadas-auth.md) registra R1–R11, sus SHA-256, recetas ready y límites. La transcripción sigue siendo evidencia primaria; una guía no demuestra compilación. Las interfaces y proyectos iniciales de los ZIP ausentes no se copian ni se presentan como código recuperado completo.

La adaptación usa los mecanismos que sí se recuperaron. Los tipos propios de cuenta proceden del DTO de Rust, y la identidad se obtiene del SDK Firebase: ninguna de esas dos piezas depende del User de TesloShop o del modelo Lugar faltante.

| Original y reconstrucción | Código recuperado | Adaptación propuesta al proyecto |
| --- | --- | --- |
| [F1](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/272. AuthService - Controlar autenticación.md>) → [R1](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/272. AuthService - Controlar autenticación - Reconstrucción guiada.md>) | Señales checking/usuario/token | Separar sesión Firebase y cuenta interna; señales de lectura. |
| [F2](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/273. AuthService - Parte 2.md>) → [R2](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/273. AuthService - Parte 2 - Reconstrucción guiada.md>) | POST, AuthResponse y tap | Sustituir login/password por sync, cuyo cuerpo es AccountResponse de Rust. |
| [F3](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/274. Manejo de excepciones.md>) → [R3](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/274. Manejo de excepciones - Reconstrucción guiada.md>) | Booleano/error y retroalimentación | Conservar el error HTTP y su categoría; no reducir todos los fallos a logout. |
| [F4](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/275. Revisar autenticación previa.md>) → [R4](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/275. Revisar autenticación previa - Reconstrucción guiada.md>) | checkStatus, Bearer y recurso de arranque | Restaurar desde el SDK Firebase; no copiar rxResource histórico ni check-status. |
| [F5](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/276. Refactorización y principio DRY.md>) → [R5](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/276. Refactorización y principio DRY - Reconstrucción guiada.md>) | logout y helpers DRY | Centralizar limpieza/transiciones; logout real usa signOut. |
| [F6](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/277. Mostrar usuario autenticado y cerrar sesión.md>) → [R6](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/277. Mostrar usuario autenticado y cerrar sesión - Reconstrucción guiada.md>) | Tres ramas de navbar y evento logout | Una página de prueba con estado y acciones, sin recuperar la tienda. |
| [F7](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/278. Interceptores en Angular.md>) → [R7](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/278. Interceptores en Angular - Reconstrucción guiada.md>) | Función de interceptor, next y registro | Conectar HTTP al registro actual sin importar el app.config incompleto del curso. |
| [F8](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/279. Auth Interceptor.md>) → [R8](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/279. Auth Interceptor - Reconstrucción guiada.md>) | req.clone y Authorization | Token asíncrono, headers.set y restricción de destino; limpiar políticas del ejemplo. |
| [F9](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular Completo/Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT/241. Introducción al Cliente HTTP de Angular (HttpClient).md>) → [R9](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular Completo/Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT/241. Introducción al Cliente HTTP de Angular (HttpClient) - Reconstrucción guiada.md>) | provideHttpClient e inyección | Registrar en app.config.ts del proyecto standalone existente. |
| [F10](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular Completo/Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT/244. Configurar Solicitudes HTTP en Angular.md>) → [R10](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular Completo/Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT/244. Configurar Solicitudes HTTP en Angular - Reconstrucción guiada.md>) | observe response y body nullable | Conservar status 201/200 y validar body de cuenta. Se toma la fase experimental recuperada. |
| [F11](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular Completo/Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT/247. Manejo de Errores HTTP en Angular.md>) → [R11](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular Completo/Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT/247. Manejo de Errores HTTP en Angular - Reconstrucción guiada.md>) | Error visible, catchError/throwError | Clasificar HTTP/SDK y cerrar pending con finalize en todos los resultados. |


## Contrato del backend que debe respetarse

La [guía de estudio del backend](../../../../backend/crates/docs/analisis/01-guia-de-estudio-auth-firebase-surrealdb.md), sección 2 (líneas 40–90), sección 9 (252–283) y sección 10 (285–318), se contrastó con [rutas](../../../../backend/crates/backend_http/src/auth_http/routes.rs), [controladores](../../../../backend/crates/backend_http/src/auth_http/auth_controller.rs), [DTO de cuenta](../../../../backend/crates/backend_http/src/auth_http/dto/account_response_dto.rs), [errores](../../../../backend/crates/backend_http/src/middleware/error.rs) y [CORS del runtime](../../../../backend/crates/backend_http/src/http_server/mod.rs).

| Petición | Entrada y efecto | Respuesta que mostrará la página |
| --- | --- | --- |
| POST `/v1/auth/sync` | Bearer Firebase ID token, sin body de identidad. Obtiene o crea cuenta interna. | 201 al crear o 200 si ya existe; `{ account_id, created_at }`. |
| GET `/v1/auth/me` | Mismo tipo de Bearer. Solo consulta la cuenta de esa identidad. | 200 con la cuenta; 404 `account_not_synced` si aún no existe. |
| GET `/v1/auth/me` deliberadamente sin Bearer | Diagnóstico negativo, sin pedir token al SDK ni reintentar. | 401 `invalid_token`. |

Otros errores: 401 `invalid_token`, 503 `auth_unavailable`, 503 `storage_unavailable`, 500 `internal_error`. El cuerpo usa `error`, no el `message` del CRUD legacy. CORS configura orígenes concretos y permite authorization/content-type, GET/POST/OPTIONS; preflight no exige token. No conectar el navegador a SurrealDB ni enviar UID, correo, roles o account_id para seleccionar otra identidad.

No implementar `/auth/login`, `/auth/register` o `/auth/check-status` por copiar el curso. La API no emite tokens nuevos; Firebase los proporciona. Los archivos y rutas legacy del backend permanecen fuera de este incremento.

## Decisión de configuración: .env real con un paso de generación explícito

**Propuesta propia**, fundamentada en la parametrización del curso F12, la configuración oficial de Angular y el runtime Node ya declarado. Angular documenta archivos environment y fileReplacements; no se dará por cargado un .env por crearlo. [Angular: Build environments](https://angular.dev/tools/cli/environments), apartados de configuración y file replacements; consulta 2026-10-17.

Usar Node para cargar el archivo y un pequeño script que genere exclusivamente la configuración pública requerida por el navegador. El flag `--env-file` y process.env están documentados por [Node: How to read environment variables](https://nodejs.org/learn/command-line/how-to-read-environment-variables-from-nodejs), sección de archivos .env; consulta 2026-10-17. No instalar dotenv ni un builder adicional para este propósito.

### Archivos y valores que se crearán al ejecutar este plan

1. `frontend/.env.example`, plantilla pública versionable.
2. `frontend/.env`, copiado de esa plantilla solo si no existe, con campos Firebase vacíos para que el usuario los complete. Nunca sobrescribir valores existentes ni inventar credenciales.
3. `frontend/scripts/generate-environment.mjs`, generador con una lista cerrada de variables.
4. `frontend/src/environments/environment.generated.ts`, generado e ignorado por Git.
5. Reglas en `.gitignore` para `.env`, `.env.*` y el generado, con excepción explícita `!.env.example`.

Contenido previsto de la plantilla y del .env inicial:

```dotenv
PUBLIC_FIREBASE_API_KEY=
PUBLIC_FIREBASE_AUTH_DOMAIN=
PUBLIC_FIREBASE_PROJECT_ID=
PUBLIC_FIREBASE_APP_ID=
PUBLIC_API_BASE_URL=http://127.0.0.1:8080
```

El prefijo PUBLIC_ es una convención elegida para este proyecto, no una capacidad automática de Angular. Los campos web de Firebase se toman de la aplicación web configurada por el usuario. PUBLIC_FIREBASE_PROJECT_ID debe coincidir con FIREBASE_PROJECT_ID aceptado en el backend; el ejemplo público actual del backend usa `business-managment-rs`. El usuario comprobará el proyecto real. No agregar claves privadas, ADC, contraseñas de base, JWT de usuario ni credenciales Admin al frontend.

PUBLIC_API_BASE_URL representa **solo el origen** del servidor (scheme, host y puerto), sin `/v1`, path extra, query o fragmento. Las rutas absolutas `/v1/auth/sync` y `/v1/auth/me` se añaden en el servicio. La URL 127.0.0.1:8080 proviene de `backend/.env.example`; no es una comprobación de que la API esté ejecutándose ahora.

### Comportamiento del generador y scripts

- Leer solo esas cinco variables; comprobar campos Firebase no vacíos y formato de projectId/authDomain sin solicitar claves privadas. Parsear la URL con URL, exigir origen y permitir HTTP para loopback de desarrollo; usar HTTPS en el despliegue que corresponda.
- Generar un objeto tipado con `firebase: { apiKey, authDomain, projectId, appId }` y `apiBaseUrl`. Usar JSON.stringify para serializar valores dentro de TypeScript; no concatenar valores de .env en código sin escapar ni ejecutar comandos con ellos.
- Si falta configuración, terminar con un error que nombre la variable; no mostrar todos los valores de process.env. No generar una configuración falsa que simule un login válido.
- Preparar `config:generate` como `node --env-file=.env scripts/generate-environment.mjs` y llamar ese paso explícitamente antes de start, build, watch y test. Conservar los scripts ng existentes; documentar que invocar ng directamente requiere generar primero. Usar el runtime que pnpm ya administra para este proyecto.
- Con .env vacío, la preparación deja un mensaje claro y queda pendiente de que el usuario complete esos campos. Para verificar sin sus credenciales, suministrar valores sintéticos mediante un entorno de prueba aislado y sustituir Firebase por un doble; no iniciar una sesión real con esos valores.
- Cambiar .env requiere volver a generar configuración y reiniciar `pnpm start`; el watcher de Angular por sí solo no implica que se relea ese archivo. No versionar el archivo generado.

No se añaden fileReplacements redundantes si el único origen es este generado. El reemplazo por entorno queda como alternativa oficial, no como una segunda configuración que compita con .env.

## Conexión local a la API, preparada para el ensayo real

El [ejemplo público del backend](../../../../backend/.env.example) declara BIND_ADDRESS=127.0.0.1, PORT=8080 y CORS_ALLOWED_ORIGINS para `http://localhost:4200` y `http://127.0.0.1:4200`. Es configuración de referencia, no lectura de archivos privados.

Al implementar:

1. Servir Angular con host `localhost` y puerto `4200`, manteniendo el origen estable. El cliente hará peticiones directas al origen PUBLIC_API_BASE_URL; no se configura un proxy que oculte la comprobación real de CORS.
2. Comprobar que la API está levantada con la configuración del usuario y que ese origen web está permitido. No reinicializar DB ni cambiar el backend para reemplazar Firebase.
3. Comprobar Google como proveedor habilitado y `localhost` como dominio autorizado de la app Firebase. No asumir que una configuración de CORS autoriza el popup de Firebase: son controles separados.
4. Probar preflight OPTIONS con Origin, Access-Control-Request-Method POST y Access-Control-Request-Headers authorization,content-type. No incluir un token en el preflight.
5. Confirmar health si está disponible, luego sesión Google real → sync → me. La aceptación no se sustituye por decodificar un JWT ni por las pruebas históricas de Rust.

No modificar .env del backend si sus valores ya son correctos; ante otro origen elegido por el usuario, ajustar únicamente la configuración de orígenes necesaria durante la implementación. Nunca copiar las credenciales SurrealDB al .env web.

## Archivos y responsabilidades de la implementación

Las rutas siguientes son relativas a `frontend/` y son objetivos nuevos del plan, no archivos ya implementados.

| Archivo | Símbolos / responsabilidad |
| --- | --- |
| `scripts/generate-environment.mjs` | Leer configuración pública, validar y escribir el generado. Sin dependencia Angular ni llamadas HTTP. |
| `src/environments/environment.generated.ts` | Exportar configuración pública; resultado del generador, no edición manual. |
| `src/app/core/config/public-config.ts` | PublicConfig y token de inyección APP_PUBLIC_CONFIG para poder usar valores controlados en pruebas. |
| `src/app/core/firebase/firebase.providers.ts` | Token FIREBASE_AUTH y factoría raíz: initializeApp/getAuth una vez usando configuración explícita. Pruebas pueden sustituir Auth sin crear una app real. |
| `src/app/auth/models/auth.models.ts` | SessionState, AccountResponse `{ account_id: string; created_at: string }`, error de API y resultado de diagnóstico. No importar User del curso. |
| `src/app/auth/services/firebase-session.service.ts` | FirebaseSessionService: señales de sesión de solo lectura, observador, loginWithGoogle, getIdToken(forceRefresh), logout. Solo SDK; no depende de HttpClient ni ejecuta sync. |
| `src/app/auth/services/account-api.service.ts` | AccountApiService.sync/current/currentWithoutBearer. HttpClient, rutas y DTO; devolver HttpResponse para conservar status. No llama SDK directamente ni persiste cuenta. |
| `src/app/auth/interceptors/firebase-token.interceptor.ts` | firebaseTokenInterceptor y token de contexto BYPASS_FIREBASE_AUTH. Adjuntar el token solo a nuestra API; renovación controlada. |
| `src/app/auth/pages/auth-test/auth-test-page.ts` | AuthTestPage: acciones, estado pendiente, último diagnóstico y limpieza al cambiar identidad. |
| `src/app/auth/pages/auth-test/auth-test-page.html` | Pantalla con Google, sync, me, consulta sin token y salida; estado y cuenta visibles. Tailwind existente, sin tienda/navbar del curso. |
| `src/app/app.config.ts` | Registrar configuración, Firebase y provideHttpClient(withInterceptors(...)); conservar proveedores vigentes de router/errores. |
| `src/app/app.routes.ts` | `/auth-test` con loadComponent y redirección de raíz con pathMatch full. La página puede verse sin sesión; los endpoints requieren Bearer. |
| `src/app/app.html` | Mostrar router-outlet y retirar únicamente la pantalla inicial de placeholder. Ajustar las pruebas generadas que esperaban esa pantalla. |
| `.env.example`, `.env`, `.gitignore`, `package.json`, `pnpm-lock.yaml`, `README.md` | Preparación/configuración e instrucciones de ejecución; Firebase modular como única dependencia funcional nueva prevista. |

Antes de añadir Firebase, resolver una versión compatible con las dependencias y Node del proyecto y fijar el resultado en el lockfile. No actualizar Angular/RxJS/Tailwind por este incremento ni instalar AngularFire por inercia. No crear capas, repositorios de dominio o gestores de estado adicionales para dos endpoints.

## Flujo de identidad, tokens y errores

### FirebaseSessionService

Mantener un único Auth proporcionado en raíz. El observador onAuthStateChanged establece checking/signed-out/signed-in y permite recuperar la sesión al recargar. Desregistrar el observador mediante DestroyRef. La fuente de la sesión es el SDK; el código propio no guarda un JWT manualmente ni manipula el almacenamiento interno de Firebase. [Firebase: Manage Users](https://firebase.google.com/docs/auth/web/manage-users), sección del usuario actual y observador; consulta 2026-10-17.

loginWithGoogle debe llamar signInWithPopup con GoogleAuthProvider como parte directa de la acción del usuario, sin esperar antes peticiones a la API que puedan perder la activación del popup. Cancelación y popup bloqueado terminan pending y dejan un mensaje local; no inventan cuenta Rust. signOut opera sobre Firebase y limpia el estado de la página. [Firebase: Google sign-in](https://firebase.google.com/docs/auth/web/google-signin), flujo SDK y signOut; consulta 2026-10-17.

getIdToken espera a que se resuelva el estado inicial del SDK, comprueba que todavía hay el mismo usuario y obtiene su Firebase ID token. Nunca usar el accessToken de Google ni gestionar refreshToken directamente. [Referencia User.getIdToken](https://firebase.google.com/docs/reference/js/auth.user), firma Promise y forceRefresh; consulta 2026-10-17.

### Interceptor sin ciclos de dependencias

El interceptor inyecta FirebaseSessionService y configuración **al entrar en su función**, antes de cualquier await o callback RxJS. El servicio de sesión no inyecta HttpClient: evita el ciclo AccountApiService → interceptor → servicio de auth → HttpClient. La clonación/registro se apoya en R7–R8; el comportamiento asíncrono es adaptación propia a Firebase.

1. Comprobar BYPASS_FIREBASE_AUTH. Si está activo, continuar sin añadir Authorization y sin solicitar ni renovar token.
2. Normalizar la URL y comparar origen exacto y pathname exacto con `/v1/auth/sync` o `/v1/auth/me`. No usar startsWith sobre el host. Para otro destino, continuar sin agregar credenciales.
3. Capturar identidad/generación actual y obtener el token del SDK con defer/from y switchMap o equivalente. Si la sesión cambió durante la espera, no enviar la petición con la identidad anterior. No emitir `Bearer null`.
4. Clonar con headers.set('Authorization', `Bearer ${token}`), evitando duplicados que produciría append al repetir. Enviar la nueva request.
5. Solo ante 401 de una petición autenticada, pedir getIdToken(true) y repetir como máximo una vez, si la identidad continúa igual. El SDK puede renovar automáticamente un token; el 401 también puede ser un rechazo de proyecto/proveedor, por eso el segundo fallo se propaga sin bucle.
6. No reintentar automáticamente 404/503 ni las llamadas negativas sin Bearer. El error de la API no debe cerrar una sesión Firebase válida por sí solo.

Los context tokens y la inyección síncrona se basan en [Angular: Interceptors](https://angular.dev/guide/http/interceptors), apartados de inyección, clonación y metadata; consulta 2026-10-17. La política de origen, un reintento y separación de errores es una decisión propia respaldada por el contrato del proyecto, no atribuida al instructor.

### AccountApiService y página

sync enviará `post<AccountResponse>(url, null, { observe: 'response' })`; current usará get con observe response. Mantener status y body distintos. Una respuesta 2xx con body nulo o shape incorrecto se mostrará como respuesta inesperada del contrato, sin declarar una cuenta válida. Definir una comprobación pequeña del DTO de cuenta; no añadir una biblioteca de esquemas por dos campos.

La página no ejecuta sync automáticamente al iniciar sesión. Mantendrá acciones separadas para poder ver me→404 antes de crear la cuenta. Después del sync podrá pedirse me y comparar account_id. Una misma acción no se duplica mientras está pendiente. La consulta sin Bearer es deliberada y visible como diagnóstico; omite el interceptor aunque haya una sesión local.

Mantener por separado sesión Firebase, cuenta Rust, acción pendiente y último resultado. En cada operación HTTP usar finalize para limpiar pending tanto en éxito como en error/cancelación. Esta es una mejora propia respecto al complete de R11; no se modifica la guía del curso para atribuírsela.

Al salir o cambiar de UID: limpiar cuenta y resultados asociados; cancelar la suscripción en curso y descartar respuestas/promesas tardías con una generación de sesión. No permitir que una cuenta de la identidad anterior reaparezca en pantalla. La salida debe poder cancelar una petición pendiente. Registrar errores de SDK y HTTP por categoría, sin token completo ni volcado de Authorization.

Mensajes mínimos: falta configuración, comprobando sesión, sin sesión, conectado a Firebase, sincronizando/consultando, cuenta obtenida, cuenta aún no sincronizada, token rechazado, servicio de identidad no disponible, almacenamiento no disponible y fallo de transporte. El status 0 de Angular no distingue por sí solo red y CORS; no afirmar una causa sin comprobarla.

## Secuencia de implementación y aceptación por incremento

1. **Preparación y contrato público:** volver a comprobar estado del proyecto, leer las guías R y originales pertinentes, crear una entrada de construcción en curso y enlazar este plan. Crear .env.example/.env sin sobrescribir datos, generador e instrucciones. Validar generación con valores sintéticos y fallo claro ante faltantes. El usuario completará su configuración web real.
2. **SDK y sesión:** añadir Firebase compatible y providers; implementar sesión con señales, observador y salida. Probar con un doble de SDK inicialización, cancelación del popup y cambio de usuario. Todavía no simular que existe cuenta Rust.
3. **HTTP y Bearer:** implementar DTO, API e interceptor con destino estricto, bypass y renovación acotada. Probar usando HttpTestingController y sesión falsa; ninguna prueba de unidad necesita Google o DB reales.
4. **Página de aceptación:** crear ruta, controles y diagnóstico; distinguir sesión/cuenta/HTTP, limpiar datos y cancelar trabajo al salir. Mantener la app mínima con Tailwind.
5. **Verificación técnica y ensayo real:** generar configuración, instalar desde lockfile y ejecutar build/tests pertinentes. Con los valores del usuario, validar dominio Firebase, API y CORS; ejecutar login Google, sync repetido y me. Completar la misma entrada de construcción con resultados realmente observados y pendientes.

Si falta configuración real del usuario, terminar la implementación verificable con valores sintéticos y documentar «pendiente de aceptación real»; no crear proyectos Firebase, tocar cuentas o prometer que la sesión real pasó. La ejecución y sus ajustes se registran al final de este documento.

## Verificaciones que justifican los cambios

| Caso | Evidencia requerida al ejecutar el plan |
| --- | --- |
| Generador | Solo exporta la lista pública; valores con comillas se serializan sin alterar TypeScript; variable faltante y URL con path no pasan silenciosamente. |
| Sesión | Primera notificación sin usuario abandona checking. Fallo/cancelación no deja pending. Logout/cambio de UID limpia cuenta y descarta una respuesta tardía. |
| Header y destino | Token solo para las dos rutas del origen configurado; host parecido u otra ruta no reciben credencial. Valor nulo nunca produce Bearer null. |
| Bypass | Consulta negativa no agrega token aunque haya sesión y no llama forceRefresh. |
| Renovación | Un 401 permite como máximo dos intentos HTTP totales y una renovación forzada; segundo 401 se muestra. Un 503 no cierra Firebase ni se reintenta. |
| Contrato de API | sync sin body de identidad conserva 201/200 y DTO; me 404 no crea una cuenta ni llama sync ocultamente. |
| Carga y errores | finalize limpia pending en éxito/error/cancelación; código error y status se conservan sin mostrarse como falso éxito. |
| Ensayo real | Con la misma sesión: 201 si era nueva o 200 si ya existía, repetición 200 y mismo account_id, luego me 200. Para una identidad no sincronizada, me 404 antes de sync. No borrar cuentas para fabricar ese caso. |
| Integración local | API activa, origen permitido, preflight sin token y sign-in Firebase con dominio autorizado. No confundir health 200 con auth aceptada. |

Las pruebas nuevas cubren contratos/riesgos del incremento, no cada método por reflejo ni una suite nueva del backend. No afirmar que las 64 pruebas históricas de Rust se repitieron en esta entrega. Compilación de los ejemplos del curso y aceptación real de Angular son comprobaciones distintas.

## Cierre y trabajo que permanece fuera

Este plan está fundamentado en las once guías instaladas y en el contrato actual del backend. El primer plan queda ejecutado en su alcance de reconstrucción recuperable, con ZIP/interfaces faltantes declarados. La ejecución del segundo completó .env, dependencia Firebase, configuración pública generada, servicios, interceptor y página. La comprobación con la configuración real del usuario continúa pendiente.

No incluye registro/contraseña propia, roles, guard de un panel administrativo, organizaciones, CRUD legacy, emulador Firebase, cookies de sesión, SSR ni acceso directo a SurrealDB. signOut no revoca automáticamente un ID token ya emitido: la limitación existente de revocación en Rust se conserva documentada en la bitácora del backend.

## Ejecución del 2026-10-18

Plan ejecutado con Firebase 13.0.0, .env/.env.example, generación pública, sesión SDK, API sync/me, interceptor y página /auth-test. La URL actual del usuario es http://127.0.0.1:8081, que sustituye el ejemplo 8080 de la preparación inicial.

Adaptaciones: con Firebase vacío se genera una configuración explícitamente inactiva para mostrar los campos pendientes y permitir el diagnóstico sin Bearer. No hay sesión ficticia. Una URL/formato inválido sí falla. La API real reveló ausencia de CORS en respuestas de error; se hizo una corrección mínima de composición con test de regresión en el backend, [bitácora 04](../../../../backend/bitacora-construccion/04-cors-en-errores-auth.md). No se modificaron datos, proveedores ni contratos.

Build correcto, 4 pruebas del generador y 21 de Angular correctas; pruebas HTTP Rust nuevas/existentes correctas. Frontend ya servido por el proceso existente en localhost:4200. El usuario debe completar los campos Firebase, reiniciar frontend y API y hacer su recorrido manual; se aplica no-usar-navegador. Resultado y límites en la bitácora enlazada; no se declara aceptación real de Firebase.
