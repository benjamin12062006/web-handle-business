# 03 — Organizar la página de auth por responsabilidad

Fecha de creación: 2026-10-18
Estado: Implementado y verificado técnicamente
Ámbito: frontend, estructura y legibilidad de auth-test
Relacionada con: [implementación inicial](02-pagina-prueba-auth-firebase.md), [reconstrucciones de auth](../docs/fonts/auth/03-reconstrucciones-ejecutadas-auth.md)
Revisión de partida: frontend sin repositorio Git; archivos reales de la implementación anterior.

## Necesidad y decisión

El usuario pide dividir el HTML extenso y hacer comprensibles las carpetas. Se extraerán cuatro componentes de presentación: configuración, sesión Firebase, cuenta y diagnóstico. Cada bloque tendrá su HTML junto a su TypeScript en una carpeta temática dentro de auth-test. La página compondrá esos bloques mediante inputs y outputs; la coordinación de acciones y cancelación seguirá en una sola instancia de estado, limitada a la vida de la página.

## Evidencia y adaptación

F1: Fernando Herrera, Angular de Cero a Experto, sección 6, [69. Pensemos en componentes](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 6 GifsApp - Pensemos en componentes/69. Pensemos en componentes.md>), líneas 13–21, describe piezas pequeñas y agrupación por feature. Ruta de biblioteca: Angular/Angular de Cero a Experto/Sección 6 GifsApp - Pensemos en componentes/69. Pensemos en componentes.md. Se consulta el principio conceptual; no se necesita recuperar el proyecto GifsApp ni se crea una reconstrucción nueva.

F2/R2: [original 277](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/277. Mostrar usuario autenticado y cerrar sesión.md>), líneas 13–21 y 27–29, y [guía existente, fases 1–2, FrontNavbarComponent](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/277. Mostrar usuario autenticado y cerrar sesión - Reconstrucción guiada.md>), muestran una vista de sesión conectada a un servicio. Misma autoría/curso, sección 20. Ruta de biblioteca: Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/277. Mostrar usuario autenticado y cerrar sesión.md. La guía es derivada y el navbar completo original no está disponible.

F3: [Guía de estilo oficial Angular](https://angular.dev/style-guide), apartados Project structure y Keep components focused on presentation; F4: [inputs](https://angular.dev/guide/components/inputs) y [outputs](https://angular.dev/guide/components/outputs). Consulta: 2026-10-18, proyecto Angular 22. La guía actual agrupa archivos por tema; el curso usa además carpetas por tipo. Adaptación: mantener auth como feature y crear subcarpetas temáticas de esta página, sin reorganizar otras features.

**Propuesta propia:** cuatro vistas con datos de entrada y eventos de salida, estado local provisto por la página y traducción de errores en una función independiente. Los hijos no reciben el SDK ni ejecutan HTTP. Se conserva una sola coordinación de identidad, pending y cancelación. No se atribuye este reparto exacto al instructor.

## Implementación y flujo

| Responsabilidad | Código | Resultado |
| --- | --- | --- |
| Composición de la página | [AuthTestPage](../src/app/auth/pages/auth-test/auth-test-page.ts), [HTML](../src/app/auth/pages/auth-test/auth-test-page.html) | Imports explícitos de los cuatro hijos y conexiones de eventos a una instancia local de AuthTestState. El HTML pasa de 162 a 45 líneas; el TypeScript de 213 a 23. |
| Configuración pendiente | [AuthConfigurationNotice](../src/app/auth/pages/auth-test/configuration-notice/auth-configuration-notice.ts), [HTML](../src/app/auth/pages/auth-test/configuration-notice/auth-configuration-notice.html) | Recibe los nombres de campos y disponibilidad; no lee .env ni inicializa el SDK. |
| Presentación de sesión | [FirebaseSessionCard](../src/app/auth/pages/auth-test/firebase-session/firebase-session-card.ts), [HTML](../src/app/auth/pages/auth-test/firebase-session/firebase-session-card.html) | Recibe estado, resumen de usuario y acción pendiente; calcula su etiqueta y emite loginRequested/logoutRequested. Se adapta F2/R2, sin acoplar la vista al servicio. |
| Cuenta interna | [ApplicationAccountCard](../src/app/auth/pages/auth-test/application-account/application-account-card.ts), [HTML](../src/app/auth/pages/auth-test/application-account/application-account-card.html) | Datos y acciones syncRequested/currentRequested. Conserva los bloqueos de botones y la cuenta separada de Firebase. |
| Diagnóstico | [ApiDiagnosticPanel](../src/app/auth/pages/auth-test/api-diagnostic/api-diagnostic-panel.ts), [HTML](../src/app/auth/pages/auth-test/api-diagnostic/api-diagnostic-panel.html) | URL, mensaje, status HTTP, región aria-live y evento withoutTokenRequested. |
| Coordinación | [AuthTestState](../src/app/auth/pages/auth-test/state/auth-test-state.ts) | Se trasladaron las operaciones, finalize, generación de identidad, cancelación y limpieza. Injectable provisto por la página, sin providedIn root: se destruye con ella. |
| Mensajes y tipos de vista | [describeAuthError](../src/app/auth/pages/auth-test/state/auth-error-message.ts), [modelos](../src/app/auth/pages/auth-test/auth-test.models.ts) | Clasificación de errores independiente de la plantilla; contrato de acciones y resumen del usuario sin exponer el SDK a los hijos. |

Cada componente tiene su HTML al lado de su TypeScript. Las tarjetas conservan su altura dentro de la cuadrícula mediante h-full; se mantienen textos, clases, encabezados accesibles y condiciones. Los servicios de sesión/API e interceptor existentes no se modifican. El [README](../README.md#organización-de-la-página) contiene el mapa de carpetas.

## Comprobación

| Comprobación ejecutada | Resultado |
| --- | --- |
| pnpm test --watch=false | 4 pruebas Node y 21 pruebas Angular correctas, 25 total. Las cinco regresiones antes ubicadas junto a la página se trasladaron a state/auth-test-state.spec.ts y comprueban el estado extraído; se conserva su comportamiento probado. |
| pnpm build | Producción correcta, 357.07 kB iniciales y 15.95 kB de página lazy; sin advertencias de presupuesto. El sandbox abortó con 134; el mismo comando autorizado fuera del sandbox terminó correctamente. |
| Prettier en los TS/HTML de auth-test | Correcto. |

Se mantiene no-usar-navegador. No hubo navegación, capturas ni inspección de la página; la presentación responsive y el recorrido real de Google quedan para la comprobación del usuario. Este cambio no repite las pruebas Rust ni declara aceptado el login real.
