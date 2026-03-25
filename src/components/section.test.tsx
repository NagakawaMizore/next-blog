import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Section } from './section';

describe('Section', () => {
  test('renders children and forwards section attributes', () => {
    render(
      <Section data-testid='section' sectionClassName='py-20' className='px-4'>
        <div>Body</div>
      </Section>,
    );

    const section = screen.getByTestId('section');
    expect(section.tagName).toBe('SECTION');
    expect(section.className).toContain('py-20');
    expect(screen.getByText('Body')).toBeInTheDocument();
  });
});

