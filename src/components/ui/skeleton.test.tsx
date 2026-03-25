import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  test('renders with default and custom classes', () => {
    render(<Skeleton data-testid='skeleton' className='h-4 w-20' />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveAttribute('data-slot', 'skeleton');
    expect(skeleton.className).toContain('animate-pulse');
    expect(skeleton.className).toContain('h-4');
    expect(skeleton.className).toContain('w-20');
  });
});

