import { Icons } from '@/components/icons/icons';
import { PostCard } from '@/components/posts/post-card';
import { Section } from '@/components/section';
import { buttonVariants } from '@/components/ui/button';
import type { Page } from '@/lib/source';
import type { BlogPost } from '@/lib/payload-posts';
import Link from 'next/link';

// 统一的文章数据格式
interface UnifiedPost {
  title: string;
  description: string;
  image?: string | null;
  url: string;
  date: string;
  author: string;
  tags?: string[];
}

// 将 MDX Page 转换为统一格式
function transformMdxPost(post: Page): UnifiedPost {
  return {
    title: post.data.title,
    description: post.data.description ?? '',
    image: post.data.image,
    url: post.url,
    date: new Date(post.data.date).toDateString(),
    author: post.data.author,
    tags: post.data.tags,
  };
}

// 将 Payload BlogPost 转换为统一格式
function transformPayloadPost(post: BlogPost): UnifiedPost {
  return {
    title: post.title,
    description: post.description,
    image: post.image,
    url: post.url,
    date: post.date.toDateString(),
    author: post.author,
    tags: post.tags,
  };
}

interface PostsProps {
  mdxPosts?: Page[];
  payloadPosts?: BlogPost[];
}

export default function Posts({ mdxPosts = [], payloadPosts = [] }: PostsProps) {
  // 转换并合并所有文章
  const allPosts: UnifiedPost[] = [
    ...mdxPosts.map(transformMdxPost),
    ...payloadPosts.map(transformPayloadPost),
  ];

  // 按日期排序
  allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Section>
      <div className='grid divide-y divide-dashed divide-border/70 text-left dark:divide-border'>
        {allPosts.map((post) => (
          <PostCard
            title={post.title}
            description={post.description}
            image={post.image}
            url={post.url}
            date={post.date}
            key={post.url}
            author={post.author}
            tags={post.tags}
          />
        ))}
        <Link
          href='/posts'
          className={buttonVariants({
            variant: 'default',
            className: 'group rounded-none py-4 sm:py-8',
          })}
        >
          View More
          <Icons.arrowUpRight className='group-hover:-rotate-12 ml-2 size-5 transition-transform' />
        </Link>
      </div>
    </Section>
  );
}
