import { describe, expect, test } from 'vitest';
import { NewsletterSchema } from './newsletter';

describe('NewsletterSchema', () => {
  test('accepts a valid email payload', () => {
    const parsed = NewsletterSchema.parse({
      email: 'user@example.com',
    });

    expect(parsed).toEqual({ email: 'user@example.com' });
  });

  test('rejects invalid email payloads', () => {
    expect(
      NewsletterSchema.safeParse({
        email: 'invalid-email',
      }).success,
    ).toBe(false);

    expect(
      NewsletterSchema.safeParse({
        email: '',
      }).success,
    ).toBe(false);
  });
});

