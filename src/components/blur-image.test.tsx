import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { BlurImage } from './blur-image';

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

describe('BlurImage', () => {
  test('renders a lazy image with loading styles by default', () => {
    const { container } = render(
      <BlurImage src='/cover.png' alt='Cover image' width={320} height={180} />,
    );

    const wrapper = container.firstChild;
    const image = screen.getByRole('img', { name: 'Cover image' });

    expect(wrapper).toHaveClass('animate-pulse');
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('data-priority', 'false');
    expect(image).toHaveClass('blur-xl', 'grayscale');
  });

  test('removes loading effect after the image loads', () => {
    const { container } = render(
      <BlurImage src='/cover.png' alt='Cover image' width={320} height={180} />,
    );

    fireEvent.load(screen.getByRole('img', { name: 'Cover image' }));

    expect(container.firstChild).not.toHaveClass('animate-pulse');
    expect(screen.getByRole('img', { name: 'Cover image' })).not.toHaveClass(
      'blur-xl',
    );
  });

  test('marks eager images as priority when lazy is disabled', () => {
    render(
      <BlurImage
        src='/hero.png'
        alt='Hero image'
        width={640}
        height={360}
        lazy={false}
      />,
    );

    const image = screen.getByRole('img', { name: 'Hero image' });
    expect(image).not.toHaveAttribute('loading');
    expect(image).toHaveAttribute('data-priority', 'true');
  });
});
