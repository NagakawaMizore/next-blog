import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('next-safe-action', () => ({
  DEFAULT_SERVER_ERROR_MESSAGE: 'Internal server error',
  createSafeActionClient: vi.fn((options: unknown) => options),
}));

describe('safe-action', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  test('returns custom message for ActionError', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { ActionError, actionClient } = await import('./safe-action');
    const client = actionClient as unknown as {
      handleServerError: (e: Error) => string;
    };

    const message = client.handleServerError(new ActionError('Custom error'));

    expect(message).toBe('Custom error');
    expect(errorSpy).toHaveBeenCalledWith(
      'Failed to execute action:',
      'Custom error',
    );
  });

  test('returns default message for unknown errors', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { actionClient } = await import('./safe-action');
    const client = actionClient as unknown as {
      handleServerError: (e: Error) => string;
    };

    const message = client.handleServerError(new Error('Unexpected'));

    expect(message).toBe('Internal server error');
    expect(errorSpy).toHaveBeenCalledWith('Failed to execute action:', 'Unexpected');
  });
});
