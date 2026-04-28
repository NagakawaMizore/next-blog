import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  type PayloadPost,
  getAllPostSlugs,
  getAllTags,
  getPostBySlug,
  getPostsByTag,
  getPublishedPosts,
} from './payload-posts';

const mocks = vi.hoisted(() => ({
  find: vi.fn(),
  getPayload: vi.fn(),
}));

vi.mock('payload', () => ({
  getPayload: mocks.getPayload,
}));

vi.mock('@payload-config', () => ({ default: {} }), { virtual: true });

const makePost = (overrides: Partial<PayloadPost> = {}): PayloadPost => ({
  id: 1,
  title: 'Payload Post',
  slug: 'payload-post',
  description: 'Post from Payload',
  content: { root: { children: [] } },
  featuredImage: {
    id: 10,
    url: '/media/cover.png',
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  author: 'Admin User',
  tags: [{ tag: 'nextjs' }, { tag: 'testing' }],
  status: 'published',
  publishedAt: '2026-01-10T00:00:00.000Z',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-12T00:00:00.000Z',
  ...overrides,
});

describe('payload-posts', () => {
  beforeEach(() => {
    mocks.find.mockReset();
    mocks.getPayload.mockReset();
    mocks.getPayload.mockResolvedValue({ find: mocks.find });
  });

  test('fetches published posts and transforms them for the blog UI', async () => {
    mocks.find.mockResolvedValue({
      docs: [makePost()],
      totalDocs: 1,
      totalPages: 1,
    });

    const result = await getPublishedPosts({ limit: 5, page: 2 });

    expect(mocks.find).toHaveBeenCalledWith({
      collection: 'posts',
      where: {
        status: { equals: 'published' },
      },
      sort: '-publishedAt',
      limit: 5,
      page: 2,
      depth: 1,
    });
    expect(result.posts[0]).toMatchObject({
      id: 1,
      title: 'Payload Post',
      slug: 'payload-post',
      url: '/posts/payload-post',
      description: 'Post from Payload',
      image: '/media/cover.png',
      author: 'Admin User',
      tags: ['nextjs', 'testing'],
    });
    expect(result.posts[0]?.date).toEqual(new Date('2026-01-10T00:00:00.000Z'));
  });

  test('uses defaults when optional post fields are missing', async () => {
    mocks.find.mockResolvedValue({
      docs: [
        makePost({
          description: undefined,
          featuredImage: 10,
          author: undefined,
          tags: undefined,
          publishedAt: undefined,
        }),
      ],
      totalDocs: 1,
      totalPages: 1,
    });

    const result = await getPublishedPosts();

    expect(result.posts[0]).toMatchObject({
      description: '',
      image: undefined,
      author: 'Admin',
      tags: [],
    });
    expect(result.posts[0]?.date).toEqual(new Date('2026-01-01T00:00:00.000Z'));
  });

  test('returns a single published post by slug or null when missing', async () => {
    mocks.find
      .mockResolvedValueOnce({
        docs: [makePost({ slug: 'found-post' })],
      })
      .mockResolvedValueOnce({
        docs: [],
      });

    await expect(getPostBySlug('found-post')).resolves.toMatchObject({
      slug: 'found-post',
      url: '/posts/found-post',
    });
    await expect(getPostBySlug('missing-post')).resolves.toBeNull();
    expect(mocks.find).toHaveBeenNthCalledWith(1, {
      collection: 'posts',
      where: {
        slug: { equals: 'found-post' },
        status: { equals: 'published' },
      },
      limit: 1,
      depth: 1,
    });
  });

  test('fetches posts by tag using an and filter', async () => {
    mocks.find.mockResolvedValue({
      docs: [makePost()],
      totalDocs: 1,
      totalPages: 1,
    });

    await getPostsByTag('testing', { limit: 3, page: 4 });

    expect(mocks.find).toHaveBeenCalledWith({
      collection: 'posts',
      where: {
        and: [
          { status: { equals: 'published' } },
          { 'tags.tag': { equals: 'testing' } },
        ],
      },
      sort: '-publishedAt',
      limit: 3,
      page: 4,
      depth: 1,
    });
  });

  test('lists published slugs and counts tags by frequency', async () => {
    mocks.find
      .mockResolvedValueOnce({
        docs: [makePost({ slug: 'first' }), makePost({ slug: 'second' })],
      })
      .mockResolvedValueOnce({
        docs: [
          makePost({ tags: [{ tag: 'nextjs' }, { tag: 'testing' }] }),
          makePost({ tags: [{ tag: 'nextjs' }, { tag: '' }] }),
          makePost({ tags: undefined }),
        ],
      });

    await expect(getAllPostSlugs()).resolves.toEqual(['first', 'second']);
    await expect(getAllTags()).resolves.toEqual([
      { tag: 'nextjs', count: 2 },
      { tag: 'testing', count: 1 },
    ]);
  });
});
