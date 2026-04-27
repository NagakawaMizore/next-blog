import { env } from '@/env';
import { baseUrl } from '@/lib/constants';
import { Resend, type UpdateContactOptions } from 'resend';
import NewsletterWelcomeEmail from '../../emails/newsletter-welcome';
import type { BlogPost } from './payload-posts';

const resend = new Resend(env.RESEND_API_KEY);

export async function updateContact({
  email,
  audienceId,
  ...props
}: {
  email: string;
  audienceId: string;
} & Omit<UpdateContactOptions, 'email' | 'audienceId'>) {
  const { data, error } = await resend.contacts.update({
    email,
    audienceId,
    ...props,
  });

  if (!data || error) {
    if (error?.name === 'not_found') {
      return null;
    }
    throw new Error(`Failed to update contact: ${error?.message}`);
  }

  return data;
}

export async function getContact({
  email,
  audienceId,
}: {
  email: string;
  audienceId: string;
}) {
  const { data: contacts, error } = await resend.contacts.list({ audienceId });

  if (error || !contacts) {
    throw new Error(
      `Failed to list contacts: ${error?.message || 'Unknown error'}`,
    );
  }

  const contact = contacts.data.find((contact) => contact.email === email);
  return contact || null;
}

export async function sendWelcomeEmail({
  posts,
  firstName,
  to,
}: {
  posts: BlogPost[];
  firstName: string;
  to: string;
}) {
  const EMAIL_FROM = env.EMAIL_FROM;
  if (!firstName || !to) throw new Error('Missing required email fields');

  const formattedPosts = posts.map((post) => ({
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    image: post.image ? new URL(post.image, baseUrl).href : undefined,
    author: post.author,
    url: new URL(post.url, baseUrl).href,
  }));

  const { data: res, error } = await resend.emails.send({
    from: EMAIL_FROM,
    to,
    subject: 'Welcome to my newsletter!',
    react: NewsletterWelcomeEmail({ firstName, posts: formattedPosts }),
  });

  if (error) {
    throw new Error(`Failed to send welcome email: ${JSON.stringify(error)}`);
  }
}
