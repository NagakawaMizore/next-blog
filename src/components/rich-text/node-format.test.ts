import { describe, expect, test } from 'vitest';
import {
  IS_BOLD,
  IS_CODE,
  IS_HIGHLIGHT,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from './node-format';

describe('node format bit flags', () => {
  test('uses power-of-two values for unique bitmasks', () => {
    const flags = [
      IS_BOLD,
      IS_ITALIC,
      IS_STRIKETHROUGH,
      IS_UNDERLINE,
      IS_CODE,
      IS_SUBSCRIPT,
      IS_SUPERSCRIPT,
      IS_HIGHLIGHT,
    ];

    for (const flag of flags) {
      expect((flag & (flag - 1)) === 0).toBe(true);
    }
  });

  test('can combine and detect individual flags with bitwise operations', () => {
    const format = IS_BOLD | IS_ITALIC | IS_CODE;

    expect((format & IS_BOLD) !== 0).toBe(true);
    expect((format & IS_ITALIC) !== 0).toBe(true);
    expect((format & IS_CODE) !== 0).toBe(true);
    expect((format & IS_UNDERLINE) !== 0).toBe(false);
  });
});

