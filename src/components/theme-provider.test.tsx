import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { ThemeProvider } from './theme-provider';

vi.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: ReactNode }) => (
    <div data-testid='next-themes-provider'>{children}</div>
  ),
}));

describe('ThemeProvider', () => {
  test('renders children through next-themes provider', () => {
    render(
      <ThemeProvider attribute='class'>
        <span>content</span>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('next-themes-provider')).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
