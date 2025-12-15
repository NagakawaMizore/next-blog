import { postsPerPage } from '@/app/(main)/layout.config';
import { NumberedPagination } from '@/components/numbered-pagination';
import { PostCard } from '@/components/posts/post-card';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';
import { getPublishedPosts, type BlogPost } from '@/lib/payload-posts';
import { getSortedByDatePosts, type Page } from '@/lib/source';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound, redirect } from 'next/navigation';

// 统一的文章类型
interface UnifiedPost {
  id: string;
  title: string;
  description: string;
  image?: string;
  url: string;
  date: Date;
  author: string;
  tags?: string[];
  source: 'mdx' | 'payload';
}

// 将 MDX 文章转换为统一格式
function transformMdxPost(post: Page): UnifiedPost {
  return {
    id: `mdx-${post.url}`,
    title: post.data.title,
    description: post.data.description ?? '',
    image: post.data.image,
    url: post.url,
    date: new Date(post.data.date),
    author: post.data.author,
    tags: post.data.tags,
    source: 'mdx',
  };
}

// 将 Payload 文章转换为统一格式
function transformPayloadPost(post: BlogPost): UnifiedPost {
  return {
    id: `payload-${post.id}`,
    title: post.title,
    description: post.description,
    image: post.image,
    url: post.url,
    date: post.date,
    author: post.author,
    tags: post.tags,
    source: 'payload',
  };
}

// 获取所有文章（合并 MDX 和 Payload）
async function getAllPosts(): Promise<UnifiedPost[]> {
  // 获取 MDX 文章
  const mdxPosts = getSortedByDatePosts().map(transformMdxPost);

  // 获取 Payload 文章（获取全部，用于分页计算）
  const { posts: payloadPosts } = await getPublishedPosts({ limit: 1000 });
  const transformedPayloadPosts = payloadPosts.map(transformPayloadPost);

  // 合并并按日期排序
  const allPosts = [...mdxPosts, ...transformedPayloadPosts];
  allPosts.sort((a, b) => b.date.getTime() - a.date.getTime());

  return allPosts;
}

const CurrentPostsCount = ({
  startIndex,
  endIndex,
  totalPosts,
}: {
  startIndex: number;
  endIndex: number;
  totalPosts: number;
}) => {
  const start = startIndex + 1;
  const end = endIndex < totalPosts ? endIndex : totalPosts;
  if (start === end) return <span>({start})</span>;
  return (
    <span>
      ({start}-{end})
    </span>
  );
};

const Pagination = ({
  pageIndex,
  pageCount,
}: {
  pageIndex: number;
  pageCount: number;
}) => {
  const handlePageChange = async (page: number) => {
    'use server';
    redirect(`/posts?page=${page}`);
  };

  return (
    <Section className='bg-dashed'>
      <NumberedPagination
        currentPage={pageIndex + 1}
        totalPages={pageCount}
        paginationItemsToDisplay={5}
        onPageChange={handlePageChange}
      />
    </Section>
  );
};

export default async function Page(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  // 获取所有文章
  const allPosts = await getAllPosts();
  const totalPosts = allPosts.length;
  const pageCount = Math.ceil(totalPosts / postsPerPage);

  const pageIndex = searchParams.page
    ? Number.parseInt(
        Array.isArray(searchParams.page)
          ? searchParams.page[0] ?? ''
          : searchParams.page,
        10
      ) - 1
    : 0;

  if (pageIndex < 0 || (pageCount > 0 && pageIndex >= pageCount)) notFound();

  const startIndex = pageIndex * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = allPosts.slice(startIndex, endIndex);

  return (
    <>
      <Section className='p-4 lg:p-6'>
        <h1 className='font-bold text-3xl leading-tight tracking-tighter md:text-4xl'>
          All {totalPosts} Posts{' '}
          <CurrentPostsCount
            startIndex={startIndex}
            endIndex={endIndex}
            totalPosts={totalPosts}
          />
        </h1>
      </Section>
      <Section className='h-full' sectionClassName='flex flex-1'>
        <div className='grid divide-y divide-dashed divide-border/70 text-left dark:divide-border'>
          {posts.map((post) => {
            const date = post.date.toDateString();
            return (
              <PostCard
                title={post.title}
                description={post.description}
                image={post.image}
                url={post.url}
                date={date}
                key={post.id}
                author={post.author}
                tags={post.tags}
              />
            );
          })}
        </div>
      </Section>
      {pageCount > 1 && <Pagination pageIndex={pageIndex} pageCount={pageCount} />}
    </>
  );
}

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const searchParams = await props.searchParams;

  const pageIndex = searchParams.page
    ? Number.parseInt(searchParams.page as string, 10)
    : 1;

  const isFirstPage = pageIndex === 1 || !searchParams.page;
  const pageTitle = isFirstPage ? 'Posts' : `Posts - Page ${pageIndex}`;
  const canonicalUrl = isFirstPage ? '/posts' : `/posts?page=${pageIndex}`;

  return createMetadata({
    title: pageTitle,
    description: `Posts${!isFirstPage ? ` - Page ${pageIndex}` : ''}`,
    openGraph: {
      url: canonicalUrl,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  });
}
