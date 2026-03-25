import { render, screen } from '@testing-library/react';
import { afterAll, beforeEach, describe, expect, test } from 'vitest';
import { TailwindIndicator } from './tailwind-indicator';

const originalEnv = process.env;

describe('TailwindIndicator', () => {
  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('renders in non-production environments', () => {
    process.env.NODE_ENV = 'test';
    render(<TailwindIndicator />);

    expect(screen.getByText('xs')).toBeInTheDocument();
  });

  test('returns null in production', () => {
    process.env.NODE_ENV = 'production';
    const { container } = render(<TailwindIndicator />);

    expect(container.firstChild).toBeNull();
  });
});

