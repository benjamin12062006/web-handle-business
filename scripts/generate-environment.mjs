import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const firebaseFields = {
  apiKey: 'PUBLIC_FIREBASE_API_KEY',
  authDomain: 'PUBLIC_FIREBASE_AUTH_DOMAIN',
  projectId: 'PUBLIC_FIREBASE_PROJECT_ID',
  appId: 'PUBLIC_FIREBASE_APP_ID',
};

export function publicConfig(env) {
  const api = new URL(env.PUBLIC_API_BASE_URL?.trim() || 'http://127.0.0.1:8081');
  const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(api.hostname);
  if (
    api.username ||
    api.password ||
    api.pathname !== '/' ||
    api.search ||
    api.hash ||
    !(api.protocol === 'https:' || (api.protocol === 'http:' && loopback))
  ) {
    throw new Error(
      'PUBLIC_API_BASE_URL debe ser un origen HTTPS o HTTP de loopback, sin path, credenciales, query ni fragmento.',
    );
  }
  const missing = Object.values(firebaseFields).filter((key) => !env[key]?.trim());
  const firebase = Object.fromEntries(
    Object.entries(firebaseFields).map(([field, key]) => [field, env[key]?.trim() || '']),
  );
  if (firebase.projectId && !/^[a-z0-9-]+$/.test(firebase.projectId)) {
    throw new Error('PUBLIC_FIREBASE_PROJECT_ID tiene un formato inválido.');
  }
  if (firebase.authDomain && !/^[a-zA-Z0-9.-]+(?::\d+)?$/.test(firebase.authDomain)) {
    throw new Error('PUBLIC_FIREBASE_AUTH_DOMAIN debe ser un dominio, sin protocolo ni path.');
  }
  return { apiBaseUrl: api.origin, firebase: missing.length ? null : firebase, missing };
}

export async function generate(
  env = process.env,
  destination = new URL('../src/environments/environment.generated.ts', import.meta.url),
) {
  const config = publicConfig(env);
  await mkdir(new URL('.', destination), { recursive: true });
  await writeFile(
    destination,
    `// Generado por scripts/generate-environment.mjs. No editar.\nimport type { PublicConfig } from '../app/core/config/public-config';\n\nexport const environment: PublicConfig = ${JSON.stringify(config, null, 2)};\n`,
  );
  if (config.missing.length)
    console.info(
      `Firebase pendiente: completa ${config.missing.join(', ')} en .env. El diagnóstico de la API sigue disponible.`,
    );
  return config;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    await generate();
  } catch (error) {
    // No imprimir valores ni dejar una configuración anterior utilizable tras un fallo.
    const { rm } = await import('node:fs/promises');
    await rm(
      fileURLToPath(new URL('../src/environments/environment.generated.ts', import.meta.url)),
      { force: true },
    );
    console.error(error instanceof Error ? error.message : 'Configuración pública inválida.');
    process.exitCode = 1;
  }
}
