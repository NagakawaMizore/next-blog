import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { NewsletterForm } from './newsletter-form';

const mocks = vi.hoisted(() => ({
  execute: vi.fn(),
  actionState: {
    result: {} as {
      data?: { message?: string };
      serverError?: string;
    },
    status: 'idle',
  },
}));

vi.mock('next-safe-action/hooks', () => ({
  useAction: vi.fn(() => ({
    execute: mocks.execute,
    result: mocks.actionState.result,
    status: mocks.actionState.status,
  })),
}));

vi.mock('@/app/(main)/(home)/actions', () => ({
  subscribeUser: vi.fn(),
}));

describe('NewsletterForm', () => {
  beforeEach(() => {
    mocks.execute.mockReset();
    mocks.actionState.result = {};
    mocks.actionState.status = 'idle';
  });

  test('submits a valid email through the safe action hook', async () => {
    render(<NewsletterForm />);

    fireEvent.change(screen.getByPlaceholderText('Email address'), {
      target: { value: 'reader@example.com' },
    });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mocks.execute).toHaveBeenCalledWith({
        email: 'reader@example.com',
      });
    });
  });

  test('shows validation feedback and does not submit invalid email input', async () => {
    render(<NewsletterForm />);

    const input = screen.getByPlaceholderText('Email address');
    fireEvent.change(input, {
      target: { value: 'not-an-email' },
    });
    fireEvent.submit(input.closest('form') as HTMLFormElement);

    await waitFor(() => {
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(mocks.execute).not.toHaveBeenCalled();
    });
  });

  test('disables controls while the action is executing', () => {
    mocks.actionState.status = 'executing';

    render(<NewsletterForm />);

    expect(screen.getByPlaceholderText('Email address')).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('renders success and server error alerts from action state', () => {
    mocks.actionState.status = 'hasSucceeded';
    mocks.actionState.result = {
      data: { message: 'Subscribed successfully.' },
      serverError: 'Server unavailable.',
    };

    render(<NewsletterForm />);

    expect(screen.getByText('Subscribed successfully.')).toBeInTheDocument();
    expect(screen.getByText('Server unavailable.')).toBeInTheDocument();
  });
});
