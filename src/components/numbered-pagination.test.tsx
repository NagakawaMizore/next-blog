import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { NumberedPagination } from './numbered-pagination';

describe('NumberedPagination', () => {
  test('renders page controls and current page', () => {
    render(
      <NumberedPagination
        currentPage={5}
        totalPages={10}
        paginationItemsToDisplay={5}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByRole('link', { name: 'Go to previous page' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go to next page' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '5' })).toHaveAttribute('aria-current');
    expect(screen.getAllByText('...')).toHaveLength(2);
  });

  test('calls onPageChange when selecting a valid page', () => {
    const onPageChange = vi.fn();
    render(
      <NumberedPagination
        currentPage={2}
        totalPages={5}
        paginationItemsToDisplay={5}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByRole('link', { name: '3' }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  test('does not call onPageChange for out-of-range previous/next actions', () => {
    const onPageChange = vi.fn();
    const { rerender } = render(
      <NumberedPagination
        currentPage={1}
        totalPages={3}
        paginationItemsToDisplay={5}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByRole('link', { name: 'Go to previous page' }));
    expect(onPageChange).not.toHaveBeenCalled();

    rerender(
      <NumberedPagination
        currentPage={3}
        totalPages={3}
        paginationItemsToDisplay={5}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByRole('link', { name: 'Go to next page' }));
    expect(onPageChange).not.toHaveBeenCalled();
  });
});

