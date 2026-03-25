import { describe, expect, test } from 'vitest';
import { createMetadata } from './metadata';

describe('createMetadata', () => {
  test('builds metadata with default open graph, twitter, and alternates fields', () => {
    const metadata = createMetadata({
      title: 'My Post',
      description: 'Post description',
    });

    expect(metadata.openGraph).toMatchObject({
      title: 'My Post',
      description: 'Post description',
      url: 'https://blog.techwithanirudh.com',
      images: '/banner.png',
      siteName: 'Blog',
    });

    expect(metadata.twitter).toMatchObject({
      card: 'summary_large_image',
      creator: '@AnirudhWith',
      title: 'My Post',
      description: 'Post description',
      images: '/banner.png',
    });

    expect(metadata.alternates).toMatchObject({
      canonical: '/',
      types: {
        'application/rss+xml': '/api/rss.xml',
      },
    });
  });

  test('allows nested metadata fields to override defaults and top-level fallbacks', () => {
    const metadata = createMetadata({
      title: 'Top Level Title',
      openGraph: {
        title: 'OG Title',
        url: 'https://example.com/posts/1',
      },
      twitter: {
        title: 'Twitter Title',
        card: 'summary',
      },
      alternates: {
        canonical: '/posts/1',
      },
    });

    expect(metadata.openGraph?.title).toBe('OG Title');
    expect(metadata.openGraph?.url).toBe('https://example.com/posts/1');
    expect(metadata.twitter?.title).toBe('Twitter Title');
    expect(metadata.twitter?.card).toBe('summary');
    expect(metadata.alternates?.canonical).toBe('/posts/1');
  });
});

