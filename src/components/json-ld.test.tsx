import { render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

vi.mock('@/app/(main)/layout.config', () => ({
  title: 'Blog',
  owner: 'Test Owner',
}));

vi.mock('@/lib/constants', () => ({
  baseUrl: new URL('http://localhost:3000'),
}));

import { PostJsonLd, TagJsonLd } from './json-ld';

describe('json-ld components', () => {
  test('renders post json-ld with blog posting and breadcrumb graph', () => {
    const { container } = render(
      <PostJsonLd
        post={{
          id: 1,
          title: 'Testing Post',
          slug: 'testing-post',
          url: '/posts/testing-post',
          description: 'A post for tests',
          content: null,
          image: '/cover.png',
          author: 'Alice',
          tags: ['testing'],
          date: new Date('2025-01-01T00:00:00.000Z'),
          createdAt: new Date('2025-01-01T00:00:00.000Z'),
          updatedAt: new Date('2025-01-02T00:00:00.000Z'),
        }}
      />,
    );

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();

    const payload = JSON.parse(script?.innerHTML ?? '{}');
    expect(payload['@context']).toBe('https://schema.org');
    expect(payload['@graph']).toHaveLength(2);
    expect(payload['@graph'][0]['@type']).toBe('BlogPosting');
    expect(payload['@graph'][0].mainEntityOfPage['@id']).toBe(
      'http://localhost:3000/posts/testing-post',
    );
  });

  test('returns null when post is not provided', () => {
    const { container } = render(<PostJsonLd post={null as unknown as any} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders tag json-ld with tag-specific breadcrumb item', () => {
    const { container } = render(<TagJsonLd tag='nextjs' />);

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();

    const payload = JSON.parse(script?.innerHTML ?? '{}');
    expect(payload['@graph']).toHaveLength(1);
    expect(payload['@graph'][0]['@type']).toBe('BreadcrumbList');
    expect(payload['@graph'][0].itemListElement[2].item).toBe(
      'http://localhost:3000/tags/nextjs',
    );
  });
});
