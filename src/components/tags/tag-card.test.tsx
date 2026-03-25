import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { TagCard } from './tag-card';

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('TagCard', () => {
  test('renders a tag link with computed tag url', () => {
    render(<TagCard name='react' />);

    const link = screen.getByRole('link', { name: /react/i });
    expect(link).toHaveAttribute('href', '/tags/react');
  });

  test('renders count only when displayCount is true and count exists', () => {
    const { rerender } = render(<TagCard name='nextjs' displayCount count={12} />);
    expect(screen.getByText('(12)')).toBeInTheDocument();

    rerender(<TagCard name='nextjs' count={12} />);
    expect(screen.queryByText('(12)')).not.toBeInTheDocument();
  });
});
