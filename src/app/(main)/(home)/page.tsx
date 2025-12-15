import Hero from '@/app/(main)/(home)/_components/hero';
import Posts from '@/app/(main)/(home)/_components/posts';
import { Icons } from '@/components/icons/icons';
import { Section } from '@/components/section';
import Separator from '@/components/separator';
import { getSortedByDatePosts } from '@/lib/source';
import { getPublishedPosts } from '@/lib/payload-posts';
import { CTA } from './_components/call-to-action';

export default async function Home() {
  // 获取 MDX 文章（保留原有功能）
  // const mdxPosts = getSortedByDatePosts().slice(0, 3);

  // 获取 Payload CMS 文章
  const { posts: payloadPosts } = await getPublishedPosts({ limit: 3 });

  return (
    <>
      <Hero />
      <Section className='py-8 sm:py-16'>
        <h2 className='text-center font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>
          <span className='inline-flex items-center gap-3'>
            Posts
            <Icons.posts className='size-10 fill-fd-primary/30 text-fd-primary transition-transform hover:rotate-12 hover:scale-125' />
          </span>
        </h2>
      </Section>
      <Separator />
      <Posts mdxPosts={[]} payloadPosts={payloadPosts} />
      <Separator />
      <CTA />
    </>
  );
}
