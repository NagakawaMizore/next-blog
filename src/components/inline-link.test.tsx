import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { InlineLink } from './inline-link';

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

describe('InlineLink', () => {
  test('renders as a normal link by default', () => {
    render(<InlineLink href='/posts'>Posts</InlineLink>);

    const link = screen.getByRole('link', { name: 'Posts' });
    expect(link).toHaveAttribute('href', '/posts');
    expect(link).not.toHaveAttribute('target', '_blank');
  });

  test('sets target blank when blank prop is true', () => {
    render(
      <InlineLink href='https://example.com' blank>
        External
      </InlineLink>,
    );

    const link = screen.getByRole('link', { name: 'External' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
