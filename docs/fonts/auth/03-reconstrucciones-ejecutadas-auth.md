# 03 — Reconstrucciones de cursos ejecutadas para la etapa de auth

Fecha de creación: 2026-10-17
Estado: Investigación; once guías derivadas creadas y verificadas
Tipo de fuente: reconstrucción derivada de transcripciones originales
Fecha de consulta: 2026-10-17
Ámbito: mecanismos para una página Angular de prueba de Firebase y API Rust
Relacionada con: [originales F1–F16](01-catalogo-cursos-angular-para-auth.md), [contrato y fuentes oficiales](02-documentacion-oficial-y-contrato-auth.md), [primer plan ejecutado](../../plans/auth/01-preparar-reconstrucciones-para-probar-auth.md), [segundo plan de implementación](../../plans/auth/02-implementar-pagina-prueba-auth.md), [guía del backend](../../../../backend/crates/docs/analisis/01-guia-de-estudio-auth-firebase-surrealdb.md)
Revisión de backend contrastada: `1c416da8da2e6b0d5970d138ce3d34951ab6eda6`; la guía retrospectiva es un archivo nuevo fuera de esa revisión.

## Resultado y alcance de certeza

Se ejecutó la selección de once lecciones del primer plan: ocho de Fernando Herrera y tres de Angular TOTAL (Federico Garay y Maximilian Schwarzmüller como coautores). Se crearon once guías independientes junto a sus originales. No se sobrescribió ninguna guía previa ni se crearon archivos ejecutables de Angular.

Cada guía tiene mapa E1/E2…, fases acumulativas, explicación, comprobaciones propuestas, experimentos temporales y código final de los archivos recuperables. El núcleo enseñado se recompuso desde el discurso; las envolturas mínimas e imports inferidos están señalados. Los ZIP de partida no están en la biblioteca. No se certifica la reproducción completa ni la compilación de TesloShop o Selector de lugares.

## Registro original → reconstrucción → mecanismo

Los F de la tabla remiten a la [ficha 01](01-catalogo-cursos-angular-para-auth.md), que conserva curso/sección/ruta relativa de la biblioteca y líneas. Los R siguientes identifican guías ya existentes, no salidas previstas.

### R1 — 272. AuthService - Controlar autenticación - Reconstrucción guiada

- Original F1: [272. AuthService - Controlar autenticación.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/272. AuthService - Controlar autenticación.md>).
- Reconstrucción: [272. AuthService - Controlar autenticación - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/272. AuthService - Controlar autenticación - Reconstrucción guiada.md>).
- Mecanismo recuperado: Fases 1–3; AuthStatus, _authStatus, user/token computed y HttpClient.
- Receta revisada: [272.json](recetas-auth/fernando/272.json).
- SHA-256 de la guía instalada: `31fc724cc2bb8731416d594136a654ce3b1f985979336ee757091e55a612df02`.

### R2 — 273. AuthService - Parte 2 - Reconstrucción guiada

- Original F2: [273. AuthService - Parte 2.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/273. AuthService - Parte 2.md>).
- Reconstrucción: [273. AuthService - Parte 2 - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/273. AuthService - Parte 2 - Reconstrucción guiada.md>).
- Mecanismo recuperado: Fases 1–3; AuthResponse, AuthService.login, tap y LoginPageComponent.onSubmit.
- Receta revisada: [273.json](recetas-auth/fernando/273.json).
- SHA-256 de la guía instalada: `23e748dbc5e68270203818cbc83a205b7153f5d045b591eac268ee6f646b291a`.

### R3 — 274. Manejo de excepciones - Reconstrucción guiada

- Original F3: [274. Manejo de excepciones.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/274. Manejo de excepciones.md>).
- Reconstrucción: [274. Manejo de excepciones - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/274. Manejo de excepciones - Reconstrucción guiada.md>).
- Mecanismo recuperado: Fases 1–2; map/catchError/of(false), hasError y navegación.
- Receta revisada: [274.json](recetas-auth/fernando/274.json).
- SHA-256 de la guía instalada: `c154ef2aef1b620248d43f3fbd78553ea65d7f836db35d1bde7731f0e67fbcd4`.

### R4 — 275. Revisar autenticación previa - Reconstrucción guiada

- Original F4: [275. Revisar autenticación previa.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/275. Revisar autenticación previa.md>).
- Reconstrucción: [275. Revisar autenticación previa - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/275. Revisar autenticación previa - Reconstrucción guiada.md>).
- Mecanismo recuperado: Fases 1–3; checkStatus, Bearer y checkStatusResource; defecto checking conservado.
- Receta revisada: [275.json](recetas-auth/fernando/275.json).
- SHA-256 de la guía instalada: `608f28f4c618d38734b646021b852a16c0fca1b80183c73976bf21dbdeb24711`.

### R5 — 276. Refactorización y principio DRY - Reconstrucción guiada

- Original F5: [276. Refactorización y principio DRY.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/276. Refactorización y principio DRY.md>).
- Reconstrucción: [276. Refactorización y principio DRY - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/276. Refactorización y principio DRY - Reconstrucción guiada.md>).
- Mecanismo recuperado: Fases 1–3; logout, handleAuthSuccess, handleAuthError y reutilización.
- Receta revisada: [276.json](recetas-auth/fernando/276.json).
- SHA-256 de la guía instalada: `57ada045f2b84bd242423eb6061a3d777f82324c209472c117ce70581d1ba34c`.

### R6 — 277. Mostrar usuario autenticado y cerrar sesión - Reconstrucción guiada

- Original F6: [277. Mostrar usuario autenticado y cerrar sesión.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/277. Mostrar usuario autenticado y cerrar sesión.md>).
- Reconstrucción: [277. Mostrar usuario autenticado y cerrar sesión - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/277. Mostrar usuario autenticado y cerrar sesión - Reconstrucción guiada.md>).
- Mecanismo recuperado: Fases 1–2; FrontNavbarComponent y bloque navbar-end con tres estados.
- Receta revisada: [277.json](recetas-auth/fernando/277.json).
- SHA-256 de la guía instalada: `3ac86d44ebb9388128c9cb186077c2e7f0357d16a7d8ad3708cfa6d9ddbd09be`.

### R7 — 278. Interceptores en Angular - Reconstrucción guiada

- Original F7: [278. Interceptores en Angular.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/278. Interceptores en Angular.md>).
- Reconstrucción: [278. Interceptores en Angular - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/278. Interceptores en Angular - Reconstrucción guiada.md>).
- Mecanismo recuperado: Fases 1–3; loggingInterceptor, registro y ejercicio negativo 401.
- Receta revisada: [278.json](recetas-auth/fernando/278.json).
- SHA-256 de la guía instalada: `0097a4e1487b6e3f9c07e70ff6832d5b8bf5cf88e7e4bece3370499cc6cafd91`.

### R8 — 279. Auth Interceptor - Reconstrucción guiada

- Original F8: [279. Auth Interceptor.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/279. Auth Interceptor.md>).
- Reconstrucción: [279. Auth Interceptor - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular de Cero a Experto/Sección 20 Autenticación y autorización/279. Auth Interceptor - Reconstrucción guiada.md>).
- Mecanismo recuperado: Fases 1–3; authInterceptor, req.clone, señal inicial y registro.
- Receta revisada: [279.json](recetas-auth/fernando/279.json).
- SHA-256 de la guía instalada: `bfe48f4ea8edbd80168c39c88dded4b882665d7b7093523d4ed97e2466e3296f`.

### R9 — 241. Introducción al Cliente HTTP de Angular (HttpClient) - Reconstrucción guiada

- Original F9: [241. Introducción al Cliente HTTP de Angular (HttpClient).md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular Completo/Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT/241. Introducción al Cliente HTTP de Angular (HttpClient).md>).
- Reconstrucción: [241. Introducción al Cliente HTTP de Angular (HttpClient) - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular Completo/Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT/241. Introducción al Cliente HTTP de Angular (HttpClient) - Reconstrucción guiada.md>).
- Mecanismo recuperado: Fases 1–2; provideHttpClient e inject(HttpClient).
- Receta revisada: [241.json](recetas-auth/angular-total/241.json).
- SHA-256 de la guía instalada: `3d58952455827e8190dd3c0eef7b519fc11781004ff92fac3c807dbac75e5bc9`.

### R10 — 244. Configurar Solicitudes HTTP en Angular - Reconstrucción guiada

- Original F10: [244. Configurar Solicitudes HTTP en Angular.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular Completo/Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT/244. Configurar Solicitudes HTTP en Angular.md>).
- Reconstrucción: [244. Configurar Solicitudes HTTP en Angular - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular Completo/Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT/244. Configurar Solicitudes HTTP en Angular - Reconstrucción guiada.md>).
- Mecanismo recuperado: Fases 1–3; response/status/body nullable, events y reversión al body.
- Receta revisada: [244.json](recetas-auth/angular-total/244.json).
- SHA-256 de la guía instalada: `87235a8b6bfbd7585a97f6cd4ec25c33547b8e6b2d05b1251a9073c960400170`.

### R11 — 247. Manejo de Errores HTTP en Angular - Reconstrucción guiada

- Original F11: [247. Manejo de Errores HTTP en Angular.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular Completo/Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT/247. Manejo de Errores HTTP en Angular.md>).
- Reconstrucción: [247. Manejo de Errores HTTP en Angular - Reconstrucción guiada.md](</Users/benji/Documents/chrome-extencions/trancripciones/Angular/Angular Completo/Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT/247. Manejo de Errores HTTP en Angular - Reconstrucción guiada.md>).
- Mecanismo recuperado: Fases 1–3; señal error, catchError/throwError y mensajes condicionales.
- Receta revisada: [247.json](recetas-auth/angular-total/247.json).
- SHA-256 de la guía instalada: `84b27ca224d3bf4984b08e5a6f2ec65b35079b1c9980fdbe268ae8af194403ea`.

## Límites por grupo y uso permitido de la evidencia

- **R1–R5, R7–R8:** User completo y algunos archivos previos no se pueden recuperar del material local. Se conservan imports hacia esas dependencias y se declara la envoltura mínima inferida. R2 recupera solamente la proyección user/token que se consume; no inventa el resto de la respuesta. El segundo plan usa las transiciones/peticiones/intercepción reconstruidas, no afirma copiar una aplicación completa ni necesita el User de TesloShop: nuestro DTO proviene de Rust.
- **R6:** se recupera el bloque de sesión del navbar; no la marca/menú o estilos previos del adjunto. Su estructura no se adopta como una nueva tienda.
- **R9–R11:** faltan modelo Lugar, componentes de presentación y CSS del ZIP. Nombres españoles y envolturas mínimas están normalizados desde la transcripción. Se usa como evidencia el código HTTP recuperado; no se reutilizan imports no disponibles del selector de lugares.
- **R4:** la firma histórica `rxResource({ loader })` se conserva y la rama sin token todavía deja checking. R5 documenta cómo el curso corrige esa transición. No se introduce Firebase en la guía fiel ni se moderniza rxResource por cuenta propia.
- **R7–R8:** el header manual se retira y removeItem se comenta para la demostración de 401. R8 no muestra restaurar removeItem, por lo que no se presenta su limpieza como resuelta. El interceptor del ejemplo usa append y no restringe destino; el plan propio usará una política explícita y segura para la API.
- **R10:** observe response/events se estudia en fases y se retira del final, tal como indica el original. Se puede adaptar la fase response para observar 201/200 de sync sin afirmar que esa opción quedó en el archivo final del curso.
- **R11:** el error oculta el indicador mediante `!error()`; complete no se ejecuta tras error y el código del curso no usa finalize. La adaptación propia sí garantizará limpiar pending en todas las salidas.

Estas limitaciones no impiden planificar los mecanismos propios, cuyos contratos son conocidos. Sí impiden llamar a las guías copias completas o ejecutables de los proyectos del instructor. La evidencia que no existe no se rellena con código atribuido al curso.

## Herramientas y comprobaciones ejecutadas

1. inventory_section.py ejecutado para las once lecciones; se comprobaron número, título y original.
2. Lectura completa de las once transcripciones y mínimo contexto: 271, configuración 247 de TesloShop, y 238/243/245/246 de Angular TOTAL; consulta de 269–270 para ubicar el estado inicial.
3. reconstruction.py draft para once recetas; completadas por el agente, no por inferencia del helper.
4. render en staging nuevo; revisión del Markdown generado, de los archivos finales y de diferencias de estado entre lecciones. Se corrigieron localizadores y dos cambios temporales que no se habían trasladado correctamente al primer ensamblaje.
5. verify final: **8 guías / 10 originales contando contexto** en Fernando; **3 guías / 7 originales contando contexto** en Angular TOTAL. Total: once guías y diecisiete originales con huellas comprobadas.
6. install: **11 creadas, 0 reutilizadas, 0 sobrescritas**. SHA-256 de cada archivo instalado contrastado con su manifest.

Registro persistente de originales/guías y huellas: [verificacion.json](recetas-auth/verificacion.json). Las recetas ready quedan separadas por curso. Para reproducirlas se utiliza el helper oficial con su raíz de curso y la carpeta de recetas correspondiente; no se modifica una huella manualmente. No se ejecutaron compilación, tests de los ejemplos, navegador ni login real por generar estas guías.

Comprobación documental del cierre: 180 enlaces locales válidos entre cinco documentos del proyecto y once guías; secuencias fonts/auth 01–03 y plans/auth 01–02 sin colisiones. El snapshot SHA-256 del frontend confirma que src, package.json, pnpm-lock.yaml, angular.json y .gitignore conservan su contenido inicial; no se añadieron archivos src. El backend conserva su revisión y los archivos de estudio no versionados que ya estaban al comenzar esta ejecución.

## Decisión trasladada al plan dos

Los mecanismos se adaptan a la sesión del SDK Firebase y a `AccountResponseDto` de Rust, sin importar el modelo User del curso ni reconstruir un backend Node. La restauración viene del observador Firebase; el token del SDK se obtiene de manera asíncrona. La API recibe Bearer en sync/me y devuelve cuenta, no tokens nuevos. Los detalles de .env, generación de configuración Angular y conexión local quedan en el [segundo plan](../../plans/auth/02-implementar-pagina-prueba-auth.md), sin implementación en esta entrega.
