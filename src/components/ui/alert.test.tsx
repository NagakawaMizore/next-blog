import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Alert, AlertDescription, AlertTitle } from './alert';

describe('Alert', () => {
  test('renders with role and slot attributes', () => {
    render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something happened.</AlertDescription>
      </Alert>,
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('data-slot', 'alert');
    expect(screen.getByText('Heads up')).toHaveAttribute('data-slot', 'alert-title');
    expect(screen.getByText('Something happened.')).toHaveAttribute(
      'data-slot',
      'alert-description',
    );
  });

  test('applies destructive variant classes', () => {
    render(<Alert variant='destructive'>Danger</Alert>);

    const alert = screen.getByRole('alert');
    expect(alert.className).toContain('text-destructive');
  });
});

