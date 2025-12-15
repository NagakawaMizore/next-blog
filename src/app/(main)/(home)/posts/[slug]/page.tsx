import {
  PostComments,
  Share,
} from '@/app/(main)/(home)/posts/[slug]/page.client';
import { PostJsonLd } from '@/components/json-ld';
import { RichText } from '@/components/rich-text';
import { Section } from '@/components/section';
import { TagCard } from '@/components/tags/tag-card';
import { createMetadata } from '@/lib/metadata';
import { metadataImage } from '@/lib/metadata-image';
import {
  getPostBySlug,
  getAllPostSlugs,
  type BlogPost,
} from '@/lib/payload-posts';
import { type Page as MDXPage, getPost, getPosts } from '@/lib/source';
import { cn } from '@/lib/utils';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Balancer from 'react-wrap-balancer';
import { description as homeDescription } from '@/app/(main)/layout.config';

// MDX 文章 Header
function MdxHeader(props: { page: MDXPage; tags?: string[] }) {
  const { page, tags } = props;

  return (
    <Section className="p-4 lg:p-6">
      <div
        className={cn(
          'flex flex-col items-start justify-center gap-4 py-8 md:gap-6',
          'sm:items-center sm:rounded-lg sm:border sm:bg-muted/70 sm:px-8 sm:py-20 sm:shadow-xs sm:dark:bg-muted'
        )}
      >
        <div className="flex flex-col gap-2 sm:text-center md:gap-4">
          <h1 className="max-w-4xl font-bold text-3xl leading-tight tracking-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
            <Balancer>{page.data.title}</Balancer>
          </h1>
          <p className="mx-auto max-w-4xl">
            <Balancer>{page.data.description}</Balancer>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <TagCard name={tag} key={tag} className=" border border-border " />
          ))}
        </div>
      </div>
    </Section>
  );
}

// Payload 文章 Header
function PayloadHeader(props: { post: BlogPost }) {
  const { post } = props;

  return (
    <Section className="p-4 lg:p-6">
      <div
        className={cn(
          'flex flex-col items-start justify-center gap-4 py-8 md:gap-6',
          'sm:items-center sm:rounded-lg sm:border sm:bg-muted/70 sm:px-8 sm:py-20 sm:shadow-xs sm:dark:bg-muted'
        )}
      >
        <div className="flex flex-col gap-2 sm:text-center md:gap-4">
          <h1 className="max-w-4xl font-bold text-3xl leading-tight tracking-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
            <Balancer>{post.title}</Balancer>
          </h1>
          <p className="mx-auto max-w-4xl">
            <Balancer>{post.description}</Balancer>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <TagCard name={tag} key={tag} className=" border border-border " />
          ))}
        </div>
      </div>
    </Section>
  );
}

// MDX 文章内容
function MdxContent({ page }: { page: MDXPage }) {
  const { body: Mdx, toc, tags, lastModified } = page.data;
  const lastUpdate = lastModified ? new Date(lastModified) : undefined;

  return (
    <>
      <MdxHeader page={page} tags={tags} />

      <Section className="h-full" sectionClassName="flex flex-1">
        <article className="flex min-h-full flex-col lg:flex-row">
          <div className="flex flex-1 flex-col gap-4">
            <InlineTOC
              items={toc}
              className="rounded-none border-0 border-border/70 border-b border-dashed dark:border-border"
            />
            <div className="prose min-w-0 flex-1 px-4">
              <Mdx
                components={{
                  ...defaultMdxComponents,
                  File,
                  Files,
                  Folder,
                  Tabs,
                  Tab,
                }}
              />
            </div>
            <PostComments
              slug={page.slugs[0] ?? ''}
              className="[&_form>div]:!rounded-none rounded-none border-0 border-border/70 border-t border-dashed dark:border-border"
            />
          </div>
          <div className="flex flex-col gap-4 p-4 text-sm lg:sticky lg:top-[4rem] lg:h-[calc(100vh-4rem)] lg:w-[250px] lg:self-start lg:overflow-y-auto lg:border-border/70 lg:border-l lg:border-dashed lg:dark:border-border">
            <div>
              <p className="mb-1 text-fd-muted-foreground">Written by</p>
              <p className="font-medium">{page.data.author}</p>
            </div>
            <div>
              <p className="mb-1 text-fd-muted-foreground text-sm">Created At</p>
              <p className="font-medium">
                {new Date(page.data.date ?? page.file.name).toDateString()}
              </p>
            </div>
            {lastUpdate && (
              <div>
                <p className="mb-1 text-fd-muted-foreground text-sm">Updated At</p>
                <p className="font-medium">{lastUpdate.toDateString()}</p>
              </div>
            )}
            <Share url={page.url} />
          </div>
        </article>
      </Section>
      <PostJsonLd page={page} />
    </>
  );
}

// Payload 文章内容
function PayloadContent({ post }: { post: BlogPost }) {
  return (
    <>
      <PayloadHeader post={post} />

      <Section className="h-full" sectionClassName="flex flex-1">
        <article className="flex min-h-full flex-col lg:flex-row">
          <div className="flex flex-1 flex-col gap-4">
            <RichText
              content={post.content as Record<string, unknown>}
              className="flex-1 px-4"
              enableProse={true}
            />
            <PostComments
              slug={post.slug}
              className="[&_form>div]:!rounded-none rounded-none border-0 border-border/70 border-t border-dashed dark:border-border"
            />
          </div>
          <div className="flex flex-col gap-4 p-4 text-sm lg:sticky lg:top-[4rem] lg:h-[calc(100vh-4rem)] lg:w-[250px] lg:self-start lg:overflow-y-auto lg:border-border/70 lg:border-l lg:border-dashed lg:dark:border-border">
            <div>
              <p className="mb-1 text-fd-muted-foreground">Written by</p>
              <p className="font-medium">{post.author}</p>
            </div>
            <div>
              <p className="mb-1 text-fd-muted-foreground text-sm">Created At</p>
              <p className="font-medium">{post.date.toDateString()}</p>
            </div>
            <div>
              <p className="mb-1 text-fd-muted-foreground text-sm">Updated At</p>
              <p className="font-medium">{post.updatedAt.toDateString()}</p>
            </div>
            <Share url={post.url} />
          </div>
        </article>
      </Section>
    </>
  );
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  // 先尝试获取 MDX 文章
  const mdxPage = getPost([params.slug]);

  if (mdxPage) {
    return <MdxContent page={mdxPage} />;
  }

  // 再尝试获取 Payload 文章
  const payloadPost = await getPostBySlug(params.slug);

  if (payloadPost) {
    return <PayloadContent post={payloadPost} />;
  }

  // 都找不到则 404
  notFound();
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  // 先尝试 MDX 文章
  const mdxPage = getPost([params.slug]);

  if (mdxPage) {
    const title = mdxPage.data.title;
    const description = mdxPage.data.description ?? homeDescription;

    return createMetadata(
      metadataImage.withImage(mdxPage.slugs, {
        title,
        description,
        openGraph: {
          url: `/posts/${mdxPage.slugs.join('/')}`,
        },
        alternates: {
          canonical: mdxPage.url,
        },
      })
    );
  }

  // 再尝试 Payload 文章
  const payloadPost = await getPostBySlug(params.slug);

  if (payloadPost) {
    return createMetadata({
      title: payloadPost.title,
      description: payloadPost.description || homeDescription,
      openGraph: {
        url: `/posts/${payloadPost.slug}`,
      },
      alternates: {
        canonical: `/posts/${payloadPost.slug}`,
      },
    });
  }

  return {};
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  // MDX 文章的 slugs
  const mdxSlugs = getPosts()
    .map((page) => page.slugs[0])
    .filter((slug): slug is string => !!slug)
    .map((slug) => ({ slug }));

  // Payload 文章的 slugs
  const payloadSlugs = await getAllPostSlugs();
  const payloadParams = payloadSlugs.map((slug) => ({ slug }));

  return [...mdxSlugs, ...payloadParams];
}
