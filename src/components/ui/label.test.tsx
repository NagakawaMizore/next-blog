import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Label } from './label';

describe('Label', () => {
  test('renders label text and exposes data-slot', () => {
    render(<Label htmlFor='email'>Email</Label>);

    const label = screen.getByText('Email');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'email');
    expect(label).toHaveAttribute('data-slot', 'label');
  });
});

