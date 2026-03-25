import { describe, expect, test } from 'vitest';
import { usePagination } from './use-pagination';

describe('usePagination', () => {
  test('returns all pages when total pages are less than display limit', () => {
    const result = usePagination({
      currentPage: 2,
      totalPages: 4,
      paginationItemsToDisplay: 5,
    });

    expect(result.pages).toEqual([1, 2, 3, 4]);
    expect(result.showLeftEllipsis).toBe(false);
    expect(result.showRightEllipsis).toBe(false);
  });

  test('shows only right ellipsis near the start of the range', () => {
    const result = usePagination({
      currentPage: 1,
      totalPages: 10,
      paginationItemsToDisplay: 5,
    });

    expect(result.pages).toEqual([1, 2, 3, 4]);
    expect(result.showLeftEllipsis).toBe(false);
    expect(result.showRightEllipsis).toBe(true);
  });

  test('shows both ellipses around middle pages', () => {
    const result = usePagination({
      currentPage: 5,
      totalPages: 10,
      paginationItemsToDisplay: 5,
    });

    expect(result.pages).toEqual([4, 5, 6]);
    expect(result.showLeftEllipsis).toBe(true);
    expect(result.showRightEllipsis).toBe(true);
  });

  test('shows only left ellipsis near the end of the range', () => {
    const result = usePagination({
      currentPage: 10,
      totalPages: 10,
      paginationItemsToDisplay: 5,
    });

    expect(result.pages).toEqual([7, 8, 9, 10]);
    expect(result.showLeftEllipsis).toBe(true);
    expect(result.showRightEllipsis).toBe(false);
  });
});

