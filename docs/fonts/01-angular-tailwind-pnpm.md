# 01 — Documentación oficial de Angular, Tailwind CSS y pnpm

Fecha de creación: 2026-10-12
Tipo de fuente: documentación oficial y registro público de paquetes
Fecha de consulta: 2026-10-12
Relacionada con: [Base Angular con Tailwind](../../bitacora-construccion/01-base-angular-tailwind.md)

## Localización y evidencia

- **F1:** [Angular CLI: ng new](https://angular.dev/cli/new), secciones `package-manager`, `standalone`, `strict`, `routing`, `zoneless`, `skip-git` y `style`. La CLI genera la aplicación y admite pnpm, componentes standalone y comprobación estricta.
- **F2:** [Angular: Using Tailwind CSS with Angular](https://angular.dev/guide/tailwind), sección «Manual Setup (Alternative Method)», pasos 2–4. Describe la instalación con pnpm y la configuración de PostCSS y CSS.
- **F3:** [Tailwind: Install Tailwind CSS with Angular](https://tailwindcss.com/docs/installation/framework-guides/angular), pasos 2–4. Requiere el plugin `@tailwindcss/postcss` en `.postcssrc.json` y `@import "tailwindcss"` en `src/styles.css`.
- **F4:** [Angular: Version compatibility](https://angular.dev/reference/versions), tabla «Actively supported versions», Angular 22. Requiere Node compatible con `^22.22.3`, `^24.15.0` o `^26.0.0`.
- **F5:** [pnpm: package.json](https://pnpm.io/package_json#devenginesruntime), sección `devEngines.runtime`. Permite descargar un runtime del proyecto; guarda la versión resuelta en el lockfile y la utiliza en los scripts.
- **F6:** Registro npm consultado mediante `pnpm view @angular/cli version engines --json`, `pnpm view @angular/core version --json` y `pnpm view tailwindcss version --json`. Versiones estables observadas: Angular CLI y Core **22.2.2**, Tailwind CSS **4.3.3**.

## Interpretación y aplicación

Las dos guías oficiales coinciden en la integración mediante PostCSS. Se usa CSS y se instalan las herramientas de estilos como dependencias de desarrollo porque generan los estilos durante la compilación. La pantalla mínima en `src/app/app.html` utiliza utilidades de Tailwind.

El Node global observado era 24.2.0. Se fija Node 24.15.0 mediante pnpm para cumplir la compatibilidad de Angular, sin modificar su instalación global. Las versiones npm son una observación de esta fecha; la compatibilidad y la integración se comprueban en este proyecto, no se deducen solamente de estas páginas.
