import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { PostCard } from './post-card';

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

vi.mock('next/image', () => ({
  default: ({
    alt,
    priority,
    quality,
    ...props
  }: React.ComponentProps<'img'> & {
    priority?: boolean;
    quality?: number;
  }) => (
    <img
      {...props}
      alt={alt ?? ''}
      data-priority={String(priority)}
      data-quality={quality}
    />
  ),
}));

vi.mock('react-wrap-balancer', () => ({
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe('PostCard', () => {
  const post = {
    title: 'Testing a Next Blog',
    description: 'A practical walkthrough for testing blog UI.',
    url: '/posts/testing-next-blog',
    date: 'Jan 1, 2026',
    author: 'Ada Lovelace',
  };

  test('renders post content inside a link to the post', () => {
    render(<PostCard {...post} />);

    const link = screen.getByRole('link', { name: /Testing a Next Blog/i });
    expect(link).toHaveAttribute('href', '/posts/testing-next-blog');
    expect(screen.getByText(post.description)).toBeInTheDocument();
    expect(screen.getByText(post.author)).toBeInTheDocument();
    expect(screen.getByText(post.date)).toBeInTheDocument();
  });

  test('renders the cover image when provided', () => {
    render(<PostCard {...post} image='/cover.png' />);

    const image = screen.getByRole('img', { name: post.title });
    expect(image).toHaveAttribute('src', '/cover.png');
    expect(image).toHaveAttribute('width', '853');
    expect(image).toHaveAttribute('height', '554');
  });

  test('does not render an image region when image is missing', () => {
    render(<PostCard {...post} image={null} />);

    expect(
      screen.queryByRole('img', { name: post.title }),
    ).not.toBeInTheDocument();
  });
});
