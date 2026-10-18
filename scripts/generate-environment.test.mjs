import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { publicConfig, generate } from './generate-environment.mjs';

const env = {
  PUBLIC_FIREBASE_API_KEY: 'public"key',
  PUBLIC_FIREBASE_AUTH_DOMAIN: 'demo.firebaseapp.com',
  PUBLIC_FIREBASE_PROJECT_ID: 'demo-auth',
  PUBLIC_FIREBASE_APP_ID: 'demo:app',
  PUBLIC_API_BASE_URL: 'http://127.0.0.1:8081',
  PRIVATE_DATABASE_PASSWORD: 'never-export-this',
};
test('exporta únicamente variables públicas y conserva los valores al serializar', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'auth-config-'));
  try {
    const destination = pathToFileURL(join(directory, 'environment.ts'));
    await generate(env, destination);
    const result = await readFile(destination, 'utf8');
    assert.ok(!result.includes('never-export-this'));
    const object = JSON.parse(
      result
        .slice(result.indexOf('= ') + 2)
        .trim()
        .slice(0, -1),
    );
    assert.equal(object.firebase.apiKey, env.PUBLIC_FIREBASE_API_KEY);
    assert.equal(object.apiBaseUrl, 'http://127.0.0.1:8081');
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
test('Firebase vacío queda explícitamente sin inicializar', () => {
  const result = publicConfig({ PUBLIC_API_BASE_URL: env.PUBLIC_API_BASE_URL });
  assert.equal(result.firebase, null);
  assert.equal(result.missing.length, 4);
});
test('rechaza path, credenciales y HTTP remoto', () => {
  for (const url of [
    'http://127.0.0.1:8081/v1',
    'https://user:pass@example.com',
    'http://example.com',
    'https://example.com?q=1',
  ]) {
    assert.throws(() => publicConfig({ ...env, PUBLIC_API_BASE_URL: url }));
  }
});
test('valida projectId y authDomain sin protocolos', () => {
  assert.throws(() => publicConfig({ ...env, PUBLIC_FIREBASE_PROJECT_ID: 'bad/project' }));
  assert.throws(() => publicConfig({ ...env, PUBLIC_FIREBASE_AUTH_DOMAIN: 'https://bad.domain' }));
});
