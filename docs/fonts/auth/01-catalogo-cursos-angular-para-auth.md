# 01 — Cursos de Angular disponibles y selección para probar auth

Fecha de creación: 2026-10-17
Última actualización: 2026-10-17
Estado: Investigación; once reconstrucciones recuperables creadas y verificadas
Tipo de fuente: transcripciones originales locales; fichas oficiales para verificar autoría
Fecha de consulta: 2026-10-17
Ámbito: una página Angular para probar la autenticación del backend Rust existente
Relacionada con: [primer plan](../../plans/auth/01-preparar-reconstrucciones-para-probar-auth.md), [contrato y documentación oficial](02-documentacion-oficial-y-contrato-auth.md), [última integración del backend](../../../../backend/bitacora-construccion/03-integrar-auth-sin-retirar-backend-existente.md), [base Angular](../../../bitacora-construccion/01-base-angular-tailwind.md)

## Necesidad y criterio

El backend ya verifica Firebase y ofrece sync/me; queda pendiente el ensayo con una sesión real del cliente. Se eligen fuentes para preparar esa página de prueba: iniciar sesión con Google mediante Firebase, obtener el ID token, sincronizar la cuenta interna, consultarla y cerrar sesión. El criterio es la cercanía a ese flujo, el uso de Angular standalone/señales y la claridad del manejo HTTP. El contrato del backend tiene prioridad sobre los contratos de ejemplo de los cursos.

Este catálogo deja disponibles todos los cursos locales de Angular de Fernando Herrera encontrados y el curso con Maximilian como coautor. Podemos seleccionar código de cualquiera cuando una necesidad concreta lo justifique; registrarlo no obliga a reconstruirlo completo ni amplía esta etapa a otras funcionalidades.

## Biblioteca y método de búsqueda

Raíz de biblioteca: `/Users/benji/Documents/chrome-extencions/trancripciones`.
Las rutas de las fichas F1–F16 se conservan relativas a esa raíz y como enlaces locales absolutos. Se excluyen `00.*`, «Reconstrucción guiada» y «Reconstruccion guiada». Se listaron las secciones y sus originales en orden numérico antes de revisar pasajes. Los conteos describen archivos locales, no prueban que se haya descargado todo el curso publicado.

Se ejecutó el buscador real `buscar-aprendizaje-en-cursos/scripts/search_transcripts.py` con consultas de autenticación, Firebase/Google y HttpClient/errores, tecnología Angular e inclusión expresa de legacy para comparar el avanzado. Las búsquedas por nombre de instructor no filtran su autoría: se contrastaron los encabezados y la URL Fuente de los originales con la ficha de Udemy. La selección procede de la lectura, no del ranking.

## Catálogo de cursos y autoría

| ID | Carpeta local / curso publicado | Autoría verificada | Originales locales | Uso en esta etapa |
| --- | --- | --- | --- | --- |
| C1 | `Angular/Angular de Cero a Experto` / Angular: De cero a experto | Fernando Herrera, DevTalles | 271 | Principal: sección 20, auth con señales e interceptores. |
| C2 | `Angular/[LEGACY] Angular Avanzado MEAN` / Angular Avanzado: Lleva tus bases al siguiente nivel - 2022 | Fernando Herrera, DevTalles | 272 | Comparar Google Identity y servicios. Es legacy; su backend MEAN y JWT propio no se trasladan. |
| C3 | `Angular/Angular Pro` / Angular Pro: Lleva tus bases al siguiente nivel | Fernando Herrera, DevTalles | 181 | Disponible como apoyo para señales/zoneless. No agrega un flujo de auth en las secciones inventariadas. |
| C4 | `Angular/Angular OpenAI con NestJS` / OpenAI: Ejercicios y asistentes con Angular + NestJS | Fernando Herrera, DevTalles | 112 con URL angular-nest-openai | Disponible; integración Angular/API y organización. IA, chat y asistentes quedan fuera de auth. |
| C5 | `Angular/Angular Completo` / Angular TOTAL - en 20 Días, La Guía Completa | Federico Garay y Maximilian Schwarzmüller | 263 | Complemento: secciones 18–19 de HTTP; tres originales de sección 18 seleccionados. |

La carpeta C4 contiene además **97 originales con URL `react-nest-openai`**; son del curso React y no deben clasificarse como Angular por compartir carpeta ni confundirse por números de lección repetidos. F16 verifica la variante Angular por su título y URL. El inventario contiene 1.196 Markdown originales en total, incluyendo esos 97 de React; no equivale a 1.196 clases de Angular.

Verificación de autoría, consultada el 2026-10-17: [C1, encabezado Created by](https://www.udemy.com/course/angular-fernando-herrera/), [C2, encabezado Created by](https://www.udemy.com/course/angular-avanzado-fernando-herrera/), [C3, encabezado Created by](https://www.udemy.com/course/angular-pro-siguiente-nivel/), [C4, encabezado Created by](https://www.udemy.com/course/angular-nest-openai/), [C5, encabezado Created by](https://www.udemy.com/course/angular-total/). En C5 los metadatos oficiales acreditan a ambos autores; los originales están narrados en español y no se atribuye cada explicación individual a Maximilian. El original F11, línea 43, se dirige a «Fede».

## Secciones pertinentes y límites

- **C1:** sección 20 «Autenticación y autorización», 15 originales locales; sección 18 «TesloShop Aplicación administrativa», solo configuración de URL como contexto. Su ejemplo autentica email/password contra `/api/auth/login`, almacena JWT y consulta `/auth/check-status` [F1–F5]. Es material renovado con señales; no implica compatibilidad literal de cada API con las dependencias actuales del proyecto.
- **C2:** sección 12 «Backend - Autenticación con Google Sign-in», sección 14 «Implementar el login y registro de usuarios en el FrontEnd» y sección 20 «Bonus - Interceptors». Se revisaron F13–F14: Google Identity directo y canje por JWT propio. La revisión antigua de librerías y el marcador `[LEGACY]` exigen tratarlo como comparación; no enseña en esos pasajes nuestro login Firebase.
- **C3:** secciones 2 «Zoneless Calculator» y 3 «Señales, comportamiento y lógica». F15 confirma servicio/señales/inyección. SSR, SSG, TanStack, paquetes e i18n no son necesarios para probar dos rutas de auth. Su carpeta también conserva secciones 15–17 de Jasmine/Karma marcadas LEGACY; no se seleccionan para esta etapa.
- **C4:** sección 2 «Frontend - Diseño y creación de la aplicación», variante AngularGPT verificada [F16]. No se reconstruyen la aplicación de chat, el backend NestJS ni las APIs de IA.
- **C5:** sección 18 «DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT» y sección 19 «DÍA 19 - GESTIÓN AVANZADA DE HTTP CON ANGULAR». F9–F11 cubren provisión del cliente, status/respuesta y errores. El inventario local no contiene una sección dedicada a Firebase Auth; no se afirma que el curso publicado carezca de ella. La lección 257 de sección 19 requiere un ZIP de componentes compartidos, por lo que no se elige para esta página mínima.

## Originales seleccionados y reconstrucciones ejecutadas

Los IDs F son fuentes consultadas. En la investigación inicial no existían las once guías; posteriormente se ejecutó el primer plan y se crearon R1–R11. Su código recuperable, límites por adjuntos ausentes y verificación están en el [registro de reconstrucciones](03-reconstrucciones-ejecutadas-auth.md). La adaptación propia quedó definida en el [plan dos](../../plans/auth/02-implementar-pagina-prueba-auth.md); aún no se implementó Angular auth.

### F1 — 272. AuthService - Controlar autenticación

- Curso: Angular de Cero a Experto. Sección: Sección 20 Autenticación y autorización.
- Original: [272. AuthService - Controlar autenticación.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/272. AuthService - Controlar autenticación.md>).
- Ruta relativa a biblioteca: `Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/272. AuthService - Controlar autenticación.md`.
- Localizador leído: líneas 25–37; encabezado y URL Fuente en líneas 1–9.
- Evidencia: AuthStatus, señales privadas y vistas de solo lectura; «checking».
- Interpretación/adaptación propuesta: Base del estado de sesión; separar después sesión Firebase y cuenta sincronizada.
- Guía creada R1: [272. AuthService - Controlar autenticación - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/272. AuthService - Controlar autenticación - Reconstrucción guiada.md>). Verificación y límites en la ficha 03.

### F2 — 273. AuthService - Parte 2

- Curso: Angular de Cero a Experto. Sección: Sección 20 Autenticación y autorización.
- Original: [273. AuthService - Parte 2.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/273. AuthService - Parte 2.md>).
- Ruta relativa a biblioteca: `Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/273. AuthService - Parte 2.md`.
- Localizador leído: líneas 13–29; encabezado y URL Fuente en líneas 1–9.
- Evidencia: login, http.post<AuthResponse>, tap y persistencia del token.
- Interpretación/adaptación propuesta: Recuperar el mecanismo HTTP; sustituir el login propio por Firebase fuera de la guía.
- Guía creada R2: [273. AuthService - Parte 2 - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/273. AuthService - Parte 2 - Reconstrucción guiada.md>). Verificación y límites en la ficha 03.

### F3 — 274. Manejo de excepciones

- Curso: Angular de Cero a Experto. Sección: Sección 20 Autenticación y autorización.
- Original: [274. Manejo de excepciones.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/274. Manejo de excepciones.md>).
- Ruta relativa a biblioteca: `Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/274. Manejo de excepciones.md`.
- Localizador leído: líneas 13–25; encabezado y URL Fuente en líneas 1–9.
- Evidencia: map, catchError, of(false) y retroalimentación en pantalla.
- Interpretación/adaptación propuesta: Comparar errores de identidad y de red; no cerrar Firebase ante cualquier fallo de API.
- Guía creada R3: [274. Manejo de excepciones - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/274. Manejo de excepciones - Reconstrucción guiada.md>). Verificación y límites en la ficha 03.

### F4 — 275. Revisar autenticación previa

- Curso: Angular de Cero a Experto. Sección: Sección 20 Autenticación y autorización.
- Original: [275. Revisar autenticación previa.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/275. Revisar autenticación previa.md>).
- Ruta relativa a biblioteca: `Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/275. Revisar autenticación previa.md`.
- Localizador leído: líneas 13–33; encabezado y URL Fuente en líneas 1–9.
- Evidencia: checkStatus, Authorization Bearer y arranque con rxResource.
- Interpretación/adaptación propuesta: Restauración asíncrona; el proyecto usará el observador de Firebase, sin copiar check-status.
- Guía creada R4: [275. Revisar autenticación previa - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/275. Revisar autenticación previa - Reconstrucción guiada.md>). Verificación y límites en la ficha 03.

### F5 — 276. Refactorización y principio DRY

- Curso: Angular de Cero a Experto. Sección: Sección 20 Autenticación y autorización.
- Original: [276. Refactorización y principio DRY.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/276. Refactorización y principio DRY.md>).
- Ruta relativa a biblioteca: `Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/276. Refactorización y principio DRY.md`.
- Localizador leído: líneas 13–29; encabezado y URL Fuente en líneas 1–9.
- Evidencia: logout, handleAuthSuccess y handleAuthError; map frente a of.
- Interpretación/adaptación propuesta: Centralizar transiciones y limpieza; adaptar logout a signOut de Firebase.
- Guía creada R5: [276. Refactorización y principio DRY - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/276. Refactorización y principio DRY - Reconstrucción guiada.md>). Verificación y límites en la ficha 03.

### F6 — 277. Mostrar usuario autenticado y cerrar sesión

- Curso: Angular de Cero a Experto. Sección: Sección 20 Autenticación y autorización.
- Original: [277. Mostrar usuario autenticado y cerrar sesión.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/277. Mostrar usuario autenticado y cerrar sesión.md>).
- Ruta relativa a biblioteca: `Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/277. Mostrar usuario autenticado y cerrar sesión.md`.
- Localizador leído: líneas 13–29; encabezado y URL Fuente en líneas 1–9.
- Evidencia: authStatus, plantilla condicional, usuario y evento logout.
- Interpretación/adaptación propuesta: Mostrar estado y acción de salida en una sola página de prueba.
- Guía creada R6: [277. Mostrar usuario autenticado y cerrar sesión - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/277. Mostrar usuario autenticado y cerrar sesión - Reconstrucción guiada.md>). Verificación y límites en la ficha 03.

### F7 — 278. Interceptores en Angular

- Curso: Angular de Cero a Experto. Sección: Sección 20 Autenticación y autorización.
- Original: [278. Interceptores en Angular.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/278. Interceptores en Angular.md>).
- Ruta relativa a biblioteca: `Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/278. Interceptores en Angular.md`.
- Localizador leído: líneas 19–33; encabezado y URL Fuente en líneas 1–9.
- Evidencia: Interceptor funcional y registro provideHttpClient/withInterceptors.
- Interpretación/adaptación propuesta: Comprender el registro; el logger de demostración no es requisito de la página.
- Guía creada R7: [278. Interceptores en Angular - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/278. Interceptores en Angular - Reconstrucción guiada.md>). Verificación y límites en la ficha 03.

### F8 — 279. Auth Interceptor

- Curso: Angular de Cero a Experto. Sección: Sección 20 Autenticación y autorización.
- Original: [279. Auth Interceptor.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/279. Auth Interceptor.md>).
- Ruta relativa a biblioteca: `Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/279. Auth Interceptor.md`.
- Localizador leído: líneas 13–27; encabezado y URL Fuente en líneas 1–9.
- Evidencia: req.clone, Authorization y selección mediante req.url.
- Interpretación/adaptación propuesta: Adjuntar ID token solamente al origen y rutas de nuestra API; no copiar localStorage manual.
- Guía creada R8: [279. Auth Interceptor - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/279. Auth Interceptor - Reconstrucción guiada.md>). Verificación y límites en la ficha 03.

### F9 — 241. Introducción al Cliente HTTP de Angular (HttpClient)

- Curso: Angular Completo. Sección: Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT.
- Original: [241. Introducción al Cliente HTTP de Angular (HttpClient).md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular Completo/Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT/241. Introducción al Cliente HTTP de Angular (HttpClient).md>).
- Ruta relativa a biblioteca: `Angular/Angular Completo/Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT/241. Introducción al Cliente HTTP de Angular (HttpClient).md`.
- Localizador leído: líneas 15–29; encabezado y URL Fuente en líneas 1–9.
- Evidencia: inject(HttpClient), provideHttpClient y alcance de los providers.
- Interpretación/adaptación propuesta: Contrastar la configuración con app.config.ts del frontend actual.
- Guía creada R9: [241. Introducción al Cliente HTTP de Angular (HttpClient) - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular Completo/Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT/241. Introducción al Cliente HTTP de Angular (HttpClient) - Reconstrucción guiada.md>). Verificación y límites en la ficha 03.

### F10 — 244. Configurar Solicitudes HTTP en Angular

- Curso: Angular Completo. Sección: Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT.
- Original: [244. Configurar Solicitudes HTTP en Angular.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular Completo/Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT/244. Configurar Solicitudes HTTP en Angular.md>).
- Ruta relativa a biblioteca: `Angular/Angular Completo/Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT/244. Configurar Solicitudes HTTP en Angular.md`.
- Localizador leído: líneas 13–27; encabezado y URL Fuente en líneas 1–9.
- Evidencia: observe: response, body nullable, status y experimento de eventos.
- Interpretación/adaptación propuesta: Observar 201/200 en sync; conservar el experimento separado del estado final del curso.
- Guía creada R10: [244. Configurar Solicitudes HTTP en Angular - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular Completo/Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT/244. Configurar Solicitudes HTTP en Angular - Reconstrucción guiada.md>). Verificación y límites en la ficha 03.

### F11 — 247. Manejo de Errores HTTP en Angular

- Curso: Angular Completo. Sección: Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT.
- Original: [247. Manejo de Errores HTTP en Angular.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular Completo/Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT/247. Manejo de Errores HTTP en Angular.md>).
- Ruta relativa a biblioteca: `Angular/Angular Completo/Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT/247. Manejo de Errores HTTP en Angular.md`.
- Localizador leído: líneas 13–19; 33–43; encabezado y URL Fuente en líneas 1–9.
- Evidencia: Error HTTP simulado, mensaje visible, catchError y throwError.
- Interpretación/adaptación propuesta: Presentar fallos comprensibles y conservar su clasificación para probar el backend.
- Guía creada R11: [247. Manejo de Errores HTTP en Angular - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular Completo/Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT/247. Manejo de Errores HTTP en Angular - Reconstrucción guiada.md>). Verificación y límites en la ficha 03.

## Fuentes de contraste y contexto, sin reconstrucción prevista

### F12 — 247. Variables de entorno y parametrización

Curso: Angular de Cero a Experto. Sección: Sección 18 TesloShop Aplicación administrativa. Original: [247. Variables de entorno y parametrización.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 18 TesloShop Aplicación administrativa/247. Variables de entorno y parametrización.md>). Ruta relativa a biblioteca: `Angular/Angular de Cero a Experto/Sección 18 TesloShop Aplicación administrativa/247. Variables de entorno y parametrización.md`. Localizador leído: líneas 13–19. Entorno y baseUrl. Solo consulta: excluir paginación de productos.

### F13 — 177. Obtener el Token de una autenticación, Google Sign-In

Curso: [LEGACY] Angular Avanzado MEAN. Sección: Sección 14 Implementar el login y registro de usuarios en el FrontEnd. Original: [177. Obtener el Token de una autenticación, Google Sign-In.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/[LEGACY] Angular Avanzado MEAN/Sección 14 Implementar el login y registro de usuarios en el FrontEnd/177. Obtener el Token de una autenticación, Google Sign-In.md>). Ruta relativa a biblioteca: `Angular/[LEGACY] Angular Avanzado MEAN/Sección 14 Implementar el login y registro de usuarios en el FrontEnd/177. Obtener el Token de una autenticación, Google Sign-In.md`. Localizador leído: líneas 13–21; 35–37. Google Identity directo, callback y token para backend propio; comparación, sin guía prevista.

### F14 — 178. Usar el Token de Google para autenticarnos

Curso: [LEGACY] Angular Avanzado MEAN. Sección: Sección 14 Implementar el login y registro de usuarios en el FrontEnd. Original: [178. Usar el Token de Google para autenticarnos.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/[LEGACY] Angular Avanzado MEAN/Sección 14 Implementar el login y registro de usuarios en el FrontEnd/178. Usar el Token de Google para autenticarnos.md>). Ruta relativa a biblioteca: `Angular/[LEGACY] Angular Avanzado MEAN/Sección 14 Implementar el login y registro de usuarios en el FrontEnd/178. Usar el Token de Google para autenticarnos.md`. Localizador leído: líneas 13; 21–29. Token de Google en el body y JWT propio de respuesta; contrato incompatible con Firebase de este proyecto.

### F15 — 23. Calculator Service

Curso: Angular Pro. Sección: Sección 3 Señales, comportamiento y lógica. Original: [23. Calculator Service.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular Pro/Sección 3 Señales, comportamiento y lógica/23. Calculator Service.md>). Ruta relativa a biblioteca: `Angular/Angular Pro/Sección 3 Señales, comportamiento y lógica/23. Calculator Service.md`. Localizador leído: líneas 13–23. Servicio, señales e inject en una calculadora; apoyo conceptual, sin reconstruir calculadora.

### F16 — 8. Inicio de proyecto - AngularGPT

Curso: Angular OpenAI con NestJS. Sección: Sección 2 Frontend - Diseño y creación de la aplicación. Original: [8. Inicio de proyecto - AngularGPT.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular OpenAI con NestJS/Sección 2 Frontend - Diseño y creación de la aplicación/8. Inicio de proyecto - AngularGPT.md>). Ruta relativa a biblioteca: `Angular/Angular OpenAI con NestJS/Sección 2 Frontend - Diseño y creación de la aplicación/8. Inicio de proyecto - AngularGPT.md`. Localizador leído: líneas 13–23. Usar únicamente «8. Inicio de proyecto - AngularGPT.md»: frontend Angular y separación de carpetas; fuera de auth.

## Decisión para esta etapa

**Principal C1**, por su secuencia explícita de servicio de auth, señales, restauración, UI e interceptor [F1–F8]. **Complemento C5**, por mostrar la respuesta HTTP completa y errores [F9–F11]. **Contraste C2**, para hacer visible la diferencia Google Identity → JWT propio frente a Firebase → ID token → API Rust [F13–F14]. C3 y C4 quedan catalogados y disponibles, sin guías nuevas para esta etapa.

La implementación futura obtendrá la identidad con el SDK Firebase modular y obedecerá al backend existente. Las brechas del curso y la documentación oficial que las cubre están en la [ficha 02](02-documentacion-oficial-y-contrato-auth.md). Ninguna fuente consultada demuestra que ya se haya probado una sesión real del frontend.

## Comprobaciones de esta investigación

Existencia y metadatos de originales verificados; pasajes recuperables con líneas físicas; autoría contrastada con fichas oficiales; variantes Angular/React separadas por URL; nombres de guías esperadas comprobados. Se ejecutó `inventory_section.py` para F1 y F10 como validación del relevo. La investigación inicial no generó guías. La ejecución posterior sí utilizó draft/render/verify/install para once lecciones; ver [registro 03](03-reconstrucciones-ejecutadas-auth.md). No se compilaron los proyectos de los cursos ni se hicieron pruebas funcionales de auth.
