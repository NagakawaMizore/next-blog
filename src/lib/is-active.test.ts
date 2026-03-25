import { describe, expect, test } from 'vitest';
import { isActive } from './is-active';

describe('isActive', () => {
  test('returns true for exact match', () => {
    expect(isActive('/posts', '/posts')).toBe(true);
  });

  test('normalizes trailing slashes before comparing', () => {
    expect(isActive('/posts/', '/posts')).toBe(true);
    expect(isActive('/posts', '/posts/')).toBe(true);
  });

  test('returns true for nested paths when nested is enabled', () => {
    expect(isActive('/posts', '/posts/hello-world', true)).toBe(true);
  });

  test('returns false for nested paths when nested is disabled', () => {
    expect(isActive('/posts', '/posts/hello-world', false)).toBe(false);
  });

  test('returns false for unrelated paths', () => {
    expect(isActive('/posts', '/tags')).toBe(false);
  });
});

