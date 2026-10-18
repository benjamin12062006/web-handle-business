# 01 — Base Angular con Tailwind CSS

Fecha de creación: 2026-10-12
Estado: Implementado y verificado
Ámbito: navigate-business-web
Relacionada con: [Fuentes oficiales](../docs/fonts/01-angular-tailwind-pnpm.md)

## Necesidad y decisión

Crear con pnpm una aplicación limpia junto a `navigate-business-api`, cambiando el sufijo a `web`. Usar la última versión estable de Angular y configurar Tailwind siguiendo la documentación oficial elegida por el usuario.

La CLI permite generar una base standalone, estricta, con router y sin Zone.js [F1]. Las guías de Angular y Tailwind coinciden en utilizar `@tailwindcss/postcss`, `.postcssrc.json` e importar Tailwind desde CSS [F2, F3]. Referencias y secciones en la [ficha de fuentes](../docs/fonts/01-angular-tailwind-pnpm.md).

Adaptación propia: pantalla inicial mínima; Node 24.15.0 administrado por pnpm mediante `devEngines.runtime` para satisfacer los requisitos de Angular 22 [F4, F5]. Este incremento no utiliza cursos ni reconstrucciones: la fuente principal solicitada es la documentación oficial.

## Implementación

- [package.json](../package.json): Angular 22.2.2, Tailwind 4.3.3, pnpm 12.5.1 y runtime local Node 24.15.0.
- [.postcssrc.json](../.postcssrc.json) y [src/styles.css](../src/styles.css): integración oficial mediante PostCSS [F2, F3].
- [App](../src/app/app.ts) y [plantilla inicial](../src/app/app.html): pantalla mínima con utilidades Tailwind y router disponible.
- [app.config.ts](../src/app/app.config.ts) y [app.routes.ts](../src/app/app.routes.ts): configuración standalone con rutas inicialmente vacías. La CLI genera Angular 22 sin Zone.js [F1].
- [pnpm-workspace.yaml](../pnpm-workspace.yaml): permite los scripts de las dependencias nativas `@parcel/watcher`, `esbuild`, `lmdb` y `msgpackr-extract`, tras `pnpm approve-builds -y` con esos nombres explícitos. El primer intento de instalación los había dejado pendientes.
- `bitacora-construccion/`, `docs/fonts/` y `docs/plans/`: creados con el inicializador de la skill dentro del componente web. La carpeta de planes conserva `.gitkeep`.

## Comprobación

| Comprobación ejecutada | Resultado |
| --- | --- |
| `pnpm install --frozen-lockfile --offline` | Instalación reproducible correcta desde el lockfile y los paquetes descargados |
| `pnpm exec node --version` | v24.15.0, runtime local compatible |
| `pnpm build` | Compilación de producción correcta, 195.19 kB iniciales |
| `pnpm test --watch=false` | 1 archivo y 2 pruebas generadas por la CLI correctas; expectativa del título adaptada |
| Inspección del CSS de producción mediante Python | 8 utilidades de la pantalla presentes, incluidas `.flex`, `.bg-slate-50` y `.text-3xl` |

La primera compilación dentro del sandbox terminó con código 134; repetirla fuera del sandbox completó correctamente. No se atribuye una causa técnica que el proceso no mostró. No se ejecutó una revisión visual en navegador.

## Alcance final

Base limpia para comenzar. Las integraciones funcionales se incorporarán en incrementos posteriores según lo solicitado. El backend conserva el estado previo observado. No había repositorio Git para la nueva aplicación y no se inicializó uno en este incremento.
