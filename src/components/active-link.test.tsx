import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { ActiveLink } from './active-link';
import { usePathname } from 'next/navigation';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

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

describe('ActiveLink', () => {
  test('applies active styles when pathname matches href', () => {
    vi.mocked(usePathname).mockReturnValue('/posts');

    render(<ActiveLink href='/posts'>Posts</ActiveLink>);

    const link = screen.getByRole('link', { name: 'Posts' });
    expect(link).toHaveClass('font-medium');
  });

  test('does not apply active styles for non-matching paths', () => {
    vi.mocked(usePathname).mockReturnValue('/tags');

    render(<ActiveLink href='/posts'>Posts</ActiveLink>);

    const link = screen.getByRole('link', { name: 'Posts' });
    expect(link).not.toHaveClass('font-medium');
  });

  test('supports nested path matching when nested prop is enabled', () => {
    vi.mocked(usePathname).mockReturnValue('/posts/testing-vitest');

    render(
      <ActiveLink href='/posts' nested>
        Posts
      </ActiveLink>,
    );

    const link = screen.getByRole('link', { name: 'Posts' });
    expect(link).toHaveClass('font-medium');
  });
});
