import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';

describe('Pagination UI', () => {
  test('renders pagination container and list slots', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href='#'>1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const nav = screen.getByLabelText('pagination');
    expect(nav).toHaveAttribute('data-slot', 'pagination');
    expect(screen.getByRole('link', { name: '1' })).toHaveAttribute(
      'data-slot',
      'pagination-link',
    );
  });

  test('sets active page attributes', () => {
    render(
      <PaginationLink href='#' isActive>
        2
      </PaginationLink>,
    );

    const link = screen.getByRole('link', { name: '2' });
    expect(link).toHaveAttribute('aria-current', 'page');
    expect(link).toHaveAttribute('data-active', 'true');
  });

  test('renders previous, next, and ellipsis affordances', () => {
    render(
      <div>
        <PaginationPrevious href='#' />
        <PaginationNext href='#' />
        <PaginationEllipsis />
      </div>,
    );

    expect(
      screen.getByRole('link', { name: 'Go to previous page' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go to next page' })).toBeInTheDocument();
    expect(screen.getByText('More pages')).toBeInTheDocument();
  });
});

