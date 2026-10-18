# 02 — Contrato existente y documentación oficial para la página de auth

Fecha de creación: 2026-10-17
Última actualización: 2026-10-17
Estado: Investigación; integración frontend pendiente
Tipo de fuente: código del proyecto y documentación oficial
Fecha de consulta: 2026-10-17
Ámbito: probar Firebase → API Rust desde una página Angular
Relacionada con: [catálogo de cursos](01-catalogo-cursos-angular-para-auth.md), [primer plan](../../plans/auth/01-preparar-reconstrucciones-para-probar-auth.md), [bitácora del backend](../../../../backend/bitacora-construccion/03-integrar-auth-sin-retirar-backend-existente.md), [contrato documentado del backend](../../../../backend/docs/plans/03-auth-firebase-surrealdb.md)
Revisión de backend inspeccionada: `1c416da8da2e6b0d5970d138ce3d34951ab6eda6`; árbol limpio al consultar. Frontend sin repositorio Git propio detectado.

## Necesidad

La última bitácora del backend deja pendiente la aceptación desde un cliente Firebase real. Esta ficha delimita el comportamiento que debe comprobar la futura página y las fuentes oficiales necesarias para cubrir las diferencias de los cursos. Las fuentes F1–F16 están en el catálogo; F17–F22 y P1–P6 se definen aquí.

## Evidencia del proyecto

| ID | Fuente y localizador | Hecho observado |
| --- | --- | --- |
| P1 | [Bitácora 03 del backend](../../../../backend/bitacora-construccion/03-integrar-auth-sin-retirar-backend-existente.md), apartados «Implementación y funcionamiento», «Comprobación» y «Límites» | El backend integra auth; su sesión real desde cliente sigue pendiente. Los resultados de Cargo y DB allí registrados son históricos, no ejecuciones nuevas de esta investigación. |
| P2 | [routes.rs](../../../../backend/crates/backend_http/src/auth_http/routes.rs), líneas 9–21; [auth_controller.rs](../../../../backend/crates/backend_http/src/auth_http/auth_controller.rs), líneas 7–35 | `POST /v1/auth/sync` y `GET /v1/auth/me`, ambos con identidad autenticada. Sync selecciona 201 al crear y 200 si existe; current consulta. |
| P3 | [AccountResponseDto](../../../../backend/crates/backend_http/src/auth_http/dto/account_response_dto.rs), líneas 4–17 | El cuerpo devuelve `account_id` y `created_at`; no devuelve JWT, roles ni perfil de Firebase. |
| P4 | [handle_runtime_rejection](../../../../backend/crates/backend_http/src/middleware/error.rs), líneas 65–101 | 401 `invalid_token`, 404 `account_not_synced`, 503 `auth_unavailable`/`storage_unavailable`, 500 `internal_error`; JSON con `error`. |
| P5 | [Servidor HTTP](../../../../backend/crates/backend_http/src/http_server/mod.rs), líneas 114–132; [FirebaseVerifier](../../../../backend/crates/backend_infrastructure/src/auth_infrastructure/firebase/firebase_token_verifier.rs), condición sobre `sign_in_provider` en línea 218 | CORS por orígenes configurados, headers authorization/content-type, métodos GET/POST/OPTIONS y `no-store`. El verificador exige proveedor `google.com`. |
| P6 | [package.json](../../../package.json), líneas 13–33; [app.config.ts](../../../src/app/app.config.ts), líneas 5–11; [rutas](../../../src/app/app.routes.ts) y [plantilla](../../../src/app/app.html) | Dependencias declaradas Angular `^22.2.2`, RxJS `~7.8.0`, Tailwind `4.3.3`. Pantalla mínima, rutas vacías y sin SDK Firebase ni proveedor HttpClient en esta configuración. No se actualizan dependencias en esta etapa. |

El [plan 03 del backend](../../../../backend/docs/plans/03-auth-firebase-surrealdb.md), apartados «Flujo propuesto», «Contrato HTTP propuesto» y «Configuración que hará falta», explica que el cliente obtiene el token y la API deriva la identidad. Esta investigación contrastó ese plan con las rutas, controladores, DTO y errores reales [P2–P5].

## Documentación oficial consultada

### F17 — Firebase: Authenticate Using Google with JavaScript

URL: [Google sign-in en Firebase Web](https://firebase.google.com/docs/auth/web/google-signin). Secciones «Before you begin», «Handle the sign-in flow with the Firebase SDK» y cierre de sesión. Consulta: 2026-10-17. Variante modular `firebase/auth`.

**Evidencia:** la guía muestra GoogleAuthProvider, signInWithPopup y signOut. También presenta un access token de Google para sus APIs. **Aplicación propuesta:** el botón de acceso usará Firebase; ese access token no se enviará como credencial a nuestra API. La configuración del proveedor y de los dominios autorizados deberá comprobarse al preparar el ensayo real; esta investigación no inspeccionó la consola Firebase.

### F18 — Firebase: Manage Users

URL: [Manage Users in Firebase](https://firebase.google.com/docs/auth/web/manage-users). Sección «Get the currently signed-in user», observador onAuthStateChanged y estado de inicialización. Consulta: 2026-10-17.

**Evidencia:** el observador permite recibir el estado de autenticación después de inicializar. **Aplicación propuesta:** usar el estado entregado por el SDK para restaurar la sesión y distinguir comprobando/sin sesión/con sesión. Es la alternativa al JWT leído manualmente del localStorage del ejemplo de Fernando [F4].

### F19 — Firebase: User.getIdToken

URL: [Referencia JavaScript User](https://firebase.google.com/docs/reference/js/auth.user), método `User.getIdToken(forceRefresh?)`. Consulta: 2026-10-17.

**Evidencia:** devuelve una Promise de token; puede renovarlo según caducidad y permite forzar renovación. **Aplicación propuesta:** obtener un ID token vigente antes de llamar a la API. Como política propia, permitir como máximo una renovación y repetición ante 401; un rechazo persistente debe quedar visible y no generar un bucle. Esa política no demuestra que todo 401 sea caducidad.

### F20 — Firebase: Verify ID Tokens

URL: [Verify ID Tokens](https://firebase.google.com/docs/auth/admin/verify-id-tokens), secciones «Retrieve ID tokens on clients» y verificación en el backend. Consulta: 2026-10-17.

**Evidencia:** el cliente obtiene su Firebase ID token y lo envía al servidor para verificarlo. **Adaptación al contrato existente:** nuestra API lo recibe en `Authorization: Bearer <ID token>` [P2]. No se usa como sustituto el token de Google Identity directo de Angular Avanzado [F13–F14]. La validación criptográfica permanece en el backend.

### F21 — Angular: Intercepting requests and responses

URL: [Interceptors](https://angular.dev/guide/http/interceptors). Secciones «Defining an interceptor», «Configuring interceptors», «Modifying requests» e inyección de dependencias. Consulta: 2026-10-17.

**Evidencia:** interceptores funcionales, registro mediante withInterceptors y clonación de requests. **Propuesta propia:** limitar la incorporación de Authorization a la URL de la API y sus rutas de auth; recuperar el token de manera asíncrona del SDK. Resolver esa asincronía fuera del contexto síncrono de inject sin volver a inyectar dentro de callbacks diferidos. La implementación exacta se decidirá en el segundo plan tras reconstruir F7–F8.

### F22 — Angular: Setting up HttpClient

URL: [Setting up HttpClient](https://angular.dev/guide/http/setup), sección «Providing HttpClient through dependency injection». Consulta: 2026-10-17.

**Evidencia:** provideHttpClient permite configurar el cliente en los providers de la aplicación. **Adaptación propuesta:** incorporarlo a app.config.ts del frontend existente [P6], conservando su forma standalone. No copiar un bootstrap completo de otro proyecto.

## Qué tomar de cursos y qué completar oficialmente

| Necesidad | Curso / evidencia | Diferencia o vacío | Fuente que gobierna la adaptación |
| --- | --- | --- | --- |
| Estado de auth y pantalla reactiva | F1, F5, F6: servicio, señales y salida | El usuario Firebase y la cuenta Rust son estados distintos. | F18 y contrato P2–P3. |
| Probar sincronización y cuenta actual | F2, F10: POST y respuesta HTTP completa | La API no ofrece login/password ni responde con token. | P2–P4 y F19–F20. |
| Restaurar sesión y cerrar | F4–F6 | check-status/localStorage y limpieza manual pertenecen al ejemplo del curso. | Observador y signOut del SDK, F17–F19. |
| Adjuntar Bearer | F7–F8 | Token del curso es síncrono; Firebase lo proporciona con una Promise. | F19, F21, F22. |
| Mostrar errores | F3 y F11 | Un fallo de almacenamiento/API no significa que Firebase cerró sesión. | Estados HTTP P4, preservando la separación de estados. |
| Comparar login social | F13–F14, Angular Avanzado | Google Identity → JWT del backend difiere de Firebase → ID token. | F17, F19–F20 y verificador existente P5. |

Se puede acudir a documentación oficial cuando falte un mecanismo en los cursos, cambie una firma, aparezca una incompatibilidad con la versión instalada o haya una mejora de eficiencia relevante para esta página. Revalidar la API usada al implementar y registrar motivo/versión; no modernizar por anticipación ni confundir una API experimental mencionada por el curso con su estado actual. El uso de rxResource en F4 se reconstruye fielmente como evidencia histórica; no obliga a adoptarlo en la adaptación.

## Comportamiento de la futura página: propuesta para el segundo plan

Una pantalla de prueba con acceso por Google, estado de Firebase, estado de sincronización y acciones para sincronizar, consultar la cuenta y salir. Mostrar endpoint, status HTTP, account_id, created_at y mensajes de error. Las acciones separadas permiten observar `me` antes de `sync` para una identidad sin cuenta; no crearla automáticamente antes de esa comprobación. El flujo normal propuesto después es sync → me, con el mismo account_id.

La configuración pública web debe corresponder al mismo proyecto que FIREBASE_PROJECT_ID; la URL de API y el origen web deben concordar con CORS. No se han leído archivos privados ni se han confirmado los valores de consola. Firebase SDK modular es la propuesta inicial; su versión compatible se elegirá al implementar, sin añadir AngularFire por inercia.

La página solo obtiene y envía el ID token. No muestra ni registra tokens completos, no administra SurrealDB, no crea usuarios/contraseñas propios, no agrega roles ni cambia las rutas legacy. signOut termina la sesión del cliente; la limitación de revocación del backend ya está descrita en P1 y no se presenta como resuelta por esta UI.

## Estado de verificación

Lectura estática del código y consulta de documentación completadas. Ninguna petición real con sesión de usuario, compilación nueva, acceso a consola Firebase o prueba visual ejecutada en esta etapa. El [primer plan](../../plans/auth/01-preparar-reconstrucciones-para-probar-auth.md) ya ejecutó las reconstrucciones recuperables: [registro 03](03-reconstrucciones-ejecutadas-auth.md). El [segundo plan](../../plans/auth/02-implementar-pagina-prueba-auth.md) define la implementación futura, incluida la creación/carga del .env y conexión a la API.
