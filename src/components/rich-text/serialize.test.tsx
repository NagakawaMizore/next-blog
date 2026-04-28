import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { IS_BOLD, IS_CODE, IS_ITALIC, IS_UNDERLINE } from './node-format';
import { serializeLexical } from './serialize';

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

describe('serializeLexical', () => {
  test('renders formatted paragraph text', () => {
    render(
      serializeLexical({
        nodes: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Important',
                format: IS_BOLD | IS_ITALIC | IS_UNDERLINE,
              },
            ],
          },
        ],
      }),
    );

    const strong = screen.getByText('Important').closest('strong');
    expect(strong).toBeInTheDocument();
    expect(screen.getByText('Important').closest('em')).toBeInTheDocument();
    expect(screen.getByText('Important').closest('span')).toHaveStyle({
      textDecoration: 'underline',
    });
  });

  test('renders internal and external links with the expected attributes', () => {
    render(
      serializeLexical({
        nodes: [
          {
            type: 'link',
            fields: {
              linkType: 'internal',
              doc: {
                relationTo: 'posts',
                value: { slug: 'hello-world' },
              },
            },
            children: [{ type: 'text', text: 'Post link' }],
          },
          {
            type: 'link',
            fields: {
              linkType: 'custom',
              url: 'https://example.com',
              newTab: true,
            },
            children: [{ type: 'text', text: 'External link' }],
          },
        ],
      }),
    );

    expect(screen.getByRole('link', { name: 'Post link' })).toHaveAttribute(
      'href',
      '/posts/hello-world',
    );
    expect(screen.getByRole('link', { name: 'External link' })).toHaveAttribute(
      'target',
      '_blank',
    );
    expect(screen.getByRole('link', { name: 'External link' })).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    );
  });

  test('renders checked and unchecked checklist items', () => {
    render(
      serializeLexical({
        nodes: [
          {
            type: 'list',
            listType: 'check',
            children: [
              {
                type: 'listitem',
                checked: true,
                children: [{ type: 'text', text: 'Done' }],
              },
              {
                type: 'listitem',
                checked: false,
                children: [{ type: 'text', text: 'Todo' }],
              },
            ],
          },
        ],
      }),
    );

    expect(screen.getByText('Done').closest('li')).toHaveAttribute(
      'aria-checked',
      'true',
    );
    expect(screen.getByText('Todo').closest('li')).toHaveAttribute(
      'aria-checked',
      'false',
    );
  });

  test('renders code blocks and inline code', () => {
    render(
      serializeLexical({
        nodes: [
          {
            type: 'code',
            children: [{ type: 'text', text: 'const value = 1;' }],
          },
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'inline', format: IS_CODE }],
          },
        ],
      }),
    );

    expect(
      screen.getByText('const value = 1;').closest('pre'),
    ).toBeInTheDocument();
    expect(screen.getByText('inline').tagName).toBe('CODE');
  });
});
