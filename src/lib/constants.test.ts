import { afterAll, beforeEach, describe, expect, test, vi } from 'vitest';

const originalEnv = process.env;

function setEnv(key: string, value?: string) {
  if (value === undefined) {
    delete process.env[key];
    return;
  }

  process.env[key] = value;
}

describe('constants', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('uses localhost base url outside production', async () => {
    setEnv('NODE_ENV', 'development');
    setEnv('VERCEL_PROJECT_PRODUCTION_URL', 'example.com');

    const constants = await import('./constants');

    expect(constants.isProduction).toBe(false);
    expect(constants.baseUrl.href).toBe('http://localhost:3000/');
  });

  test('uses vercel production url in production', async () => {
    setEnv('NODE_ENV', 'production');
    setEnv('VERCEL_PROJECT_PRODUCTION_URL', 'blog.example.com');

    const constants = await import('./constants');

    expect(constants.isProduction).toBe(true);
    expect(constants.baseUrl.href).toBe('https://blog.example.com/');
  });

  test('falls back to localhost when production url is missing', async () => {
    setEnv('NODE_ENV', 'production');
    setEnv('VERCEL_PROJECT_PRODUCTION_URL');

    const constants = await import('./constants');

    expect(constants.isProduction).toBe(true);
    expect(constants.baseUrl.href).toBe('http://localhost:3000/');
  });
});

