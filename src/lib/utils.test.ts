import { describe, expect, test } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  test('merges class names and resolves tailwind conflicts', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  test('handles conditional and falsy inputs', () => {
    expect(cn('text-sm', false && 'hidden', undefined, 'font-medium')).toBe(
      'text-sm font-medium',
    );
  });

  test('supports object and array style class inputs', () => {
    expect(
      cn(['inline-flex', ['items-center']], { 'cursor-pointer': true }),
    ).toBe('inline-flex items-center cursor-pointer');
  });
});

