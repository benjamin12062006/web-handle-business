# 01 — Preparar reconstrucciones para una página de prueba de auth

Fecha de creación: 2026-10-17
Última actualización: 2026-10-17
Estado: Ejecutado en su alcance de reconstrucción recuperable; once guías verificadas y plan dos creado
Ámbito: autenticación Firebase del backend existente, mediante una página Angular
Relacionada con: [catálogo y originales F1–F16](../../fonts/auth/01-catalogo-cursos-angular-para-auth.md), [contrato y fuentes oficiales F17–F22](../../fonts/auth/02-documentacion-oficial-y-contrato-auth.md), [bitácora 03 del backend](../../../../backend/bitacora-construccion/03-integrar-auth-sin-retirar-backend-existente.md), [base frontend](../../../bitacora-construccion/01-base-angular-tailwind.md)
Revisión de referencia del backend: `1c416da8da2e6b0d5970d138ce3d34951ab6eda6`. No hay revisión Git del frontend; inspección directa de su árbol.

## Objetivo y entregas separadas

Preparar la evidencia necesaria para una sola página Angular que pruebe la autenticación ya implementada: Google mediante Firebase → Firebase ID token → POST sync → GET me → cierre de sesión. El ensayo con cliente real es lo que la última bitácora deja pendiente; esta etapa no abarca otras funcionalidades del producto.

1. **Entrega actual:** inicialización/verificación del archivo documental, fuentes y este primer plan con los Markdown exactos que reconstruiremos. Completada documentalmente.
2. **Reconstrucciones:** once guías creadas y verificadas, preservando el ejemplo y declarando el código de partida no disponible. [Registro y límites](../../fonts/auth/03-reconstrucciones-ejecutadas-auth.md).
3. **Segundo plan:** [02-implementar-pagina-prueba-auth.md](02-implementar-pagina-prueba-auth.md), creado con originales, guías verificadas y contrato actual. Incluye .env y conexión a la API para su ejecución posterior.
4. **Implementación y ensayo real:** trabajo posterior al segundo plan.

## Punto de partida y decisión de fuentes

El frontend contiene la base Angular/Tailwind y una pantalla mínima, sin SDK Firebase ni configuración de HttpClient. El backend sí contiene rutas sync/me, cuenta interna y verificador del proveedor google.com. Su contrato y la situación de pruebas se contrastaron con el código en la [ficha 02, P1–P6](../../fonts/auth/02-documentacion-oficial-y-contrato-auth.md).

**Fuente principal:** Fernando Herrera, Angular de Cero a Experto, sección 20. Enseña el servicio de auth, señales, restauración, limpieza, UI e interceptores funcionales [F1–F8]. La cercanía técnica a esta necesidad justifica elegirlo; no se afirma que su contrato de contraseña/JWT sea el nuestro.

**Complemento:** Angular TOTAL, guardado como Angular Completo, de Federico Garay y Maximilian Schwarzmüller. Seleccionamos provisión de HttpClient, observación del status y errores [F9–F11]. La autoría del curso no identifica a Maximilian como narrador individual de estos originales en español.

**Contraste:** Angular Avanzado MEAN de Fernando Herrera, marcado LEGACY. F13–F14 permiten comparar Google Identity y JWT propio. No se reconstruyen para copiar ese login: no coincide con Firebase del backend. Angular Pro y Angular + NestJS quedan disponibles en el catálogo; la calculadora, SSR, chat e IA no añaden código necesario a este ensayo.

## Markdown originales que se reconstruirán

Las rutas completas, sección, curso, localizadores y guías previstas de cada ID se encuentran en la [ficha de fuentes](../../fonts/auth/01-catalogo-cursos-angular-para-auth.md). Aquí se conserva el orden y el motivo de cada reconstrucción. Los nombres son los archivos existentes, no títulos aproximados.

### Lote A — Fernando Herrera: servicio, estado y peticiones

Curso: `Angular/Angular de Cero a Experto`.
Sección exacta: `Sección 20 Autenticación y autorización`.

| Orden | ID | Markdown original exacto | Qué código recuperar | Para qué servirá en auth |
| --- | --- | --- | --- | --- |
| 1 | F1 | `272. AuthService - Controlar autenticación.md` | AuthService, AuthStatus, señales privadas y computed. | Diseñar estado observable sin confundir inicialización con ausencia de sesión. |
| 2 | F2 | `273. AuthService - Parte 2.md` | login, http.post, AuthResponse y actualizaciones del estado. | Entender transporte y respuesta; después adaptar a sync y a la sesión de Firebase. |
| 3 | F3 | `274. Manejo de excepciones.md` | map/catchError/of y presentación del error. | Mostrar errores sin dejar acciones cargando indefinidamente. |
| 4 | F4 | `275. Revisar autenticación previa.md` | checkStatus, headers Bearer y disparo inicial rxResource. | Comparar restauración del ejemplo con el observador Firebase que necesitará el proyecto. |
| 5 | F5 | `276. Refactorización y principio DRY.md` | logout, handleAuthSuccess, handleAuthError y retornos RxJS. | Recuperar responsabilidades y centralizar transiciones, sin copiar el cierre ante todo error HTTP. |
| 6 | F6 | `277. Mostrar usuario autenticado y cerrar sesión.md` | Consumo de señales en plantilla y evento de salida. | Estado visible y botón de salida en la página de prueba. |

### Lote B — Fernando Herrera: interceptor

Mismo curso y sección; continuar después del lote A.

| Orden | ID | Markdown original exacto | Qué código recuperar | Para qué servirá en auth |
| --- | --- | --- | --- | --- |
| 7 | F7 | `278. Interceptores en Angular.md` | Función de intercepción, next y provideHttpClient/withInterceptors. | Saber cómo conectar el envío del token al cliente HTTP. |
| 8 | F8 | `279. Auth Interceptor.md` | req.clone, Authorization Bearer y consumo del servicio. | Base para restringir el token a nuestra API y adaptarlo a obtención asíncrona. |

### Lote C — Angular TOTAL: observar y diagnosticar HTTP

Curso local: `Angular/Angular Completo`.
Sección exacta: `Sección 18 DÍA 18 - INTRODUCCIÓN AL HTTPCLIENT`.

| Orden | ID | Markdown original exacto | Qué código recuperar | Para qué servirá en auth |
| --- | --- | --- | --- | --- |
| 9 | F9 | `241. Introducción al Cliente HTTP de Angular (HttpClient).md` | inject(HttpClient), provideHttpClient y alcance del proveedor. | Contrastar el registro con app.config.ts del proyecto. |
| 10 | F10 | `244. Configurar Solicitudes HTTP en Angular.md` | observe response, status y body nullable; experimento temporal con eventos. | Observar la diferencia 201/200 de sync sin inventar un campo created en su cuerpo. |
| 11 | F11 | `247. Manejo de Errores HTTP en Angular.md` | Callback de error, señal/mensaje y catchError/throwError. | Distinguir errores HTTP y de transporte y mostrarlos al probar los endpoints. |

Total inicial seleccionado: **11 reconstrucciones**, ahora creadas y verificadas en su núcleo recuperable. Sus adjuntos/interfaces faltantes permanecen identificados. Es una selección por mecanismo; no es una reconstrucción de cursos completos ni un máximo para contexto que resulte indispensable.

## Dependencias y recuperación del estado inicial

Antes de reconstruir cada lección hay que leerla completamente. Las lecturas de pasajes de esta investigación bastan para seleccionar, no para declarar recuperado todo su código. Listar originales de su sección, en orden numérico, excluyendo 00.* y guías.

Para Fernando, consultar solo si hace falta:

- `269. Continuación.md`, `270. Rutas y páginas de autenticación.md` y `271. Formulario reactivo de autenticación.md`, en la misma sección 20: estado de partida del proyecto, layout, componente y formulario que usa el ejemplo. La página propia no necesita implementar registro ni formulario de contraseña por leer esas dependencias.
- `247. Variables de entorno y parametrización.md`, en `Sección 18 TesloShop Aplicación administrativa`: baseUrl/environments [F12]. La parte de productos/paginación no pasa a nuestro alcance.
- F1 menciona un tipo User previamente disponible en auth.interfaces. Si el original anterior no expone su definición completa, registrar el recurso adjunto o código de partida faltante. No completar roles/fullName ni otros campos como si fueran una transcripción literal.

Para Angular TOTAL, consultar solo si hace falta, en su misma sección 18:

- `238. Proyecto Inicial Frontend y Backend en Angular.md`: proyecto inicial y recursos necesarios.
- `243. Enviar Solicitudes GET en Angular.md`: petición y suscripción que F10 configura.
- `245. Transformar y Usar Datos de Respuesta en Angular.md` y `246. Mostrar un Texto de Respaldo (Fallback) durante la Carga en Angular.md`: transformación y carga que F11 presupone.

Estas ocho rutas de contexto se verificaron existentes. No se programan guías automáticamente para todas ellas. Si recuperar un estado completo exige reconstruir una dependencia, añadir su archivo exacto y justificación a este mismo plan antes de generar esa guía. Si faltan ZIP, interfaces o archivos iniciales que la transcripción no permite recuperar, marcar la incertidumbre o el faltante y conservar el análisis; no fabricar el código. No trasladar una guía incompleta al segundo plan como fuente de código completo.

## Procedimiento para la siguiente etapa

Aplicar reconstruir-codigo-curso y su dependencia obligatoria reconstruir-cursos-con-scripts. Herramientas locales verificadas bajo `/Users/benji/.agents/skills/`:

1. Ejecutar `reconstruir-codigo-curso/scripts/inventory_section.py` con la sección y el nombre exacto de la lección. Reutilizar una guía existente fiel si apareció desde esta investigación.
2. Leer íntegro el original; recuperar el mínimo contexto. Crear matriz E1/E2… con símbolos, líneas, frase y certeza. Conservar nombres, contratos y librerías del instructor, incluso cuando la adaptación futura será distinta.
3. Leer `reconstruir-codigo-curso/references/output-standard.md` y `reconstruir-cursos-con-scripts/references/01-formato-recetas.md`; preparar una receta por lección mediante `reconstruction.py draft`, indicando raíz real del curso y original relativo.
4. Completar evidencia, estado inicial, fases acumulativas, experimentos eliminados y código final de todos los archivos relevantes. Marcar ready solo después de revisar fidelidad y faltantes.
5. Ejecutar `reconstruction.py render` en staging nuevo fuera de la biblioteca, leer el Markdown y contrastarlo con la transcripción. Ejecutar `verify` sobre su manifest. La fecha se tomará del contexto local vigente cuando se reconstruya.
6. Guardar con `install`, respetando los permisos del entorno y sin sobrescribir guías existentes. Salida por original: `N. Título - Reconstrucción guiada.md`, en su misma carpeta. El nombre exacto esperado de cada guía consta en la ficha de fuentes.
7. Registrar las guías realmente creadas/reutilizadas como R1… con original F, fase/símbolo y resultado de verify. La validación de hashes/Markdown no equivale a compilar ni probar el ejemplo.

Las recetas y staging son material de preparación; no crean código ejecutable del frontend. Este procedimiento ya se ejecutó tras la autorización del usuario; los resultados están en la ficha 03. La implementación y sus dependencias siguen pendientes del segundo plan.

## Evidencia exigida antes del segundo plan

| Necesidad | Original / guía a obtener | Comparación necesaria |
| --- | --- | --- |
| Estado de sesión y pantalla | F1, F5, F6 → guías y símbolos verificados | Separar sesión Firebase de cuenta Rust y estado de cada petición. |
| Acceso HTTP y status | F2, F9, F10 → guías verificadas | Sustituir contrato login del ejemplo por sync/me, body de cuenta y 201/200. |
| Restauración y cierre | F4–F6 → guías verificadas | Firebase observador/getIdToken/signOut frente a JWT/manual localStorage. |
| Transporte del token | F7–F8 → guías verificadas | Interceptor funcional con token asíncrono y restricción de destino. |
| Errores | F3, F11 → guías verificadas | 401/404/503 y fallo de red; no tratar storage_unavailable como cierre de Firebase. |
| Proveedor de identidad | F13–F14, contraste leído; F17–F20 oficiales | Explicar por qué Google Identity directo/JWT de MEAN no cumple el contrato actual. |

Con los mecanismos reconstruidos disponibles se creó [02-implementar-pagina-prueba-auth.md](02-implementar-pagina-prueba-auth.md). Define archivos/símbolos, .env y su carga explícita, Firebase y URL API, estados de la página, transporte del ID token, errores y aceptación. Usa las piezas recuperadas como evidencia de mecanismo; no presenta las envolturas o proyectos incompletos del curso como aplicaciones ejecutables completas.

## Comprobación prevista para la implementación posterior

Esta matriz define qué debe permitir observar la página; ninguna fila se presenta como probada hoy.

| Caso | Resultado esperado y condición |
| --- | --- |
| Iniciar sesión con Google | Sesión Firebase real del mismo proyecto permitido por la API; cancelación/popup bloqueado visibles sin falso éxito. |
| me antes de sync | 404 account_not_synced solo si esa identidad aún no tiene cuenta interna; no borrar una cuenta existente para producir el caso. |
| sync inicial y repetición | 201 si es una cuenta nueva; 200 si ya existe; account_id estable en repeticiones. |
| me después de sync | 200 con el mismo account_id y created_at; no crea una cuenta por consultar. |
| Sin credencial o token inválido | 401; rechazo persistente visible. Una acción negativa deliberada debe poder omitir el Bearer sin que el interceptor lo reinserte. |
| Cuenta/proyecto no admitido | Rechazo de identidad; si se dispone de sesión de prueba de otro proyecto, registrar el resultado real. No inventar credenciales o crear proyectos para producirlo. |
| Error 503 de auth o almacenamiento | Mensaje específico y estado de petición limpio; sesión Firebase no se declara cerrada por ese solo fallo. Simular de manera aislada si no hay un fallo real disponible. |
| Fallo de transporte / CORS | Error visible; status 0 del navegador no identifica por sí solo la causa. Comprobar origen y preflight cuando se ejecute. |
| Recargar y salir | Restaurar desde SDK; signOut limpia la UI y evita nuevas llamadas autenticadas. No confundirlo con revocación de tokens ya emitidos en Rust. |

Al implementar: compilación del frontend, verificaciones proporcionadas al cambio y ensayo manual real con resultados sanitizados. No ampliar la suite del backend por preparar esta documentación. La prueba visual no se ejecuta en esta etapa documental.

## Estado y comprobación de la preparación inicial

Se ejecutó el inicializador oficial de documentación del frontend y se reutilizaron sus tres áreas existentes. Se inventariaron fuentes y planes antes de añadir las subcarpetas auth; ambas secuencias nuevas comienzan en 01. Se localizaron los cursos, verificaron metadatos y rutas y se contrastaron los contratos reales del backend. Se ejecutó inventory_section.py para F1 y F10 y se comprobó que, en ese momento inicial, las once guías esperadas todavía no existían.

Verificación documental: 44 enlaces locales existentes, fechas y delimitadores Markdown correctos, secuencias sin colisiones (fonts/auth 01–02, plans/auth 01). Comparación SHA-256 contra un snapshot tomado durante esta tarea: archivos src, package.json y pnpm-lock.yaml sin cambios. Durante esa preparación inicial, el árbol Git del backend estaba limpio en la revisión indicada.

## Ejecución de reconstrucciones y cierre del primer plan

Se inventariaron los once originales, se leyeron con contexto y se crearon once recetas mediante draft. El agente completó evidencia y código, renderizó en staging separado, revisó el Markdown y sus cambios, corrigió discrepancias y ejecutó verify antes de install. Resultado: ocho guías de Fernando y tres de Angular TOTAL creadas junto al original; ninguna sobrescrita. Verify comprobó diez originales de Fernando y siete de Angular TOTAL incluyendo contexto. Las recetas revisadas y huellas se conservaron en la [ficha 03](../../fonts/auth/03-reconstrucciones-ejecutadas-auth.md).

Los ZIP iniciales no están disponibles: User completo, componentes de presentación y parte de la configuración heredada no se pueden reproducir fielmente. Las guías lo declaran; el segundo plan usa el núcleo recuperado y contratos propios conocidos. No se añadieron guías para los cursos catalogados que no necesitaban reconstrucción en este alcance.

El [segundo plan](02-implementar-pagina-prueba-auth.md) ya está escrito. Quedan pendientes únicamente su ejecución y la aceptación real del cliente. .env, SDK Firebase y conexión efectiva a la API pertenecen a esa ejecución. No se compilaron ni ejecutaron los proyectos del curso; verify es validación de evidencia/Markdown, no funcional.

El frontend conserva src, package.json, lockfile, angular.json y .gitignore sin cambios frente al inicio de esta ejecución. El backend mantiene la misma revisión; su guía nueva en crates/docs/ es un archivo previo de esta tarea aportado por el usuario y se conserva. No se modifican configuración privada, base de datos ni historial Git. No se abre una bitácora de funcionalidad implementada por reconstruir documentación.
