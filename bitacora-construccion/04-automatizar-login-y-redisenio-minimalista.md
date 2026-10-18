# 04 — Automatizar login y rediseño minimalista

Fecha de creación: 2026-10-18
Estado: Implementado
Ámbito: Rediseño visual a tema claro y automatización de la sincronización.
Relacionada con: [02-pagina-prueba-auth-firebase.md](./02-pagina-prueba-auth-firebase.md)

## Objetivo

El usuario solicitó cambiar el diseño de la página de prueba de autenticación (`/auth-test`) para que se comporte y se vea como una página de "Inicio de sesión" (Sign In) estándar, con tema claro y diseño minimalista ("Split-screen") igual a un diseño de referencia.

Además, solicitó eliminar la necesidad de oprimir botones manuales para "Sincronizar" o "Consultar" la cuenta tras un inicio de sesión de Firebase exitoso.

## Decisiones

1. **Flujo automatizado**:
   Se modifica `AuthTestState` en `auth-test-state.ts` para que, inmediatamente después de un inicio de sesión exitoso con Google (`this.session.loginWithGoogle()`), el estado desencadene la operación de sincronización (`sync()`) en la API, emulando el flujo de una aplicación de producción donde la autenticación y la sincronización con el backend ocurren en un solo paso de cara al usuario.
   Para evitar carreras (race conditions) con los efectos reactivos de Angular que limpian las peticiones cuando el `generation` de la sesión cambia, usamos una breve asincronía (`setTimeout` o similar) antes de despachar `this.sync()`.

2. **Apariencia visual (Tema Claro Minimalista)**:
   Se abandona el diseño oscuro segmentado en tres bloques explícitos ("Sesión", "Cuenta", "Diagnóstico"). Se diseña un bloque unificado de tipo *landing* de autenticación:
   - Formulario decorativo de email/password (que informa que el uso por el momento es exclusivo de Google).
   - Botón principal de "Continuar con Google".
   - Al loguearse y sincronizarse con éxito, en la misma interfaz se mostrarán los datos devueltos por la API de forma fluida.

3. **Simplificación del HTML**:
   Se integran los datos de la cuenta sincronizada en la propia vista limpia en lugar de forzar paneles de diagnóstico oscuros.

## Comprobación

- [x] Ejecutar la automatización de `sync()` en `AuthTestState` y comprobar que no se cancela.
- [x] Aplicar colores claros (`bg-white`, `text-slate-900`, `border-gray-200`) en TailwindCSS al componente principal.
- [x] Verificar compilación estática (build).
