import { describe, expect, test } from 'vitest';
import { buttonVariants } from './button';

describe('buttonVariants', () => {
  test('returns default variant and size classes when no args are provided', () => {
    const classes = buttonVariants();

    expect(classes).toContain('bg-primary');
    expect(classes).toContain('h-9');
  });

  test('returns destructive and icon classes for explicit options', () => {
    const classes = buttonVariants({
      variant: 'destructive',
      size: 'icon',
    });

    expect(classes).toContain('bg-destructive');
    expect(classes).toContain('size-9');
  });

  test('includes caller-provided className', () => {
    const classes = buttonVariants({ className: 'w-full' });

    expect(classes).toContain('w-full');
  });
});

