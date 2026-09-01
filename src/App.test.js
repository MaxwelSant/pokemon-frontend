import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock fetch globally
global.fetch = jest.fn();

describe('App component branding', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders "codeCake AI Agent" text in loading state', () => {
    // Mock fetch to delay response (keeps loading state visible)
    global.fetch.mockImplementation(
      () => new Promise(resolve => {
        // Never resolves to keep loading state
      })
    );

    render(<App />);
    const brandingText = screen.queryByText('codeCake AI Agent');
    expect(brandingText).toBeInTheDocument();
  });

  test('renders "codeCake AI Agent" text in error state', async () => {
    // Mock fetch to reject with error
    global.fetch.mockRejectedValue(new Error('API Error'));

    render(<App />);

    // Wait for error state to be displayed
    await waitFor(() => {
      const brandingText = screen.queryByText('codeCake AI Agent');
      expect(brandingText).toBeInTheDocument();
    });
  });

  test('renders "codeCake AI Agent" text in main state', async () => {
    // Mock successful API responses
    global.fetch.mockImplementation((url) => {
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [] })
        });
      }
      if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [] })
        });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });

    render(<App />);

    // Wait for data to load and main state to be displayed
    await waitFor(() => {
      const brandingText = screen.queryByText('codeCake AI Agent');
      expect(brandingText).toBeInTheDocument();
    });
  });

  test('branding text is inside span with className="powered-by"', async () => {
    // Mock successful API responses
    global.fetch.mockImplementation((url) => {
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [] })
        });
      }
      if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ data: [] })
        });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });

    render(<App />);

    // Wait for branding element to exist
    await waitFor(() => {
      const brandingSpan = document.querySelector('.powered-by');
      expect(brandingSpan).toBeInTheDocument();
      expect(brandingSpan).toHaveTextContent('codeCake AI Agent');
    });
  });
});
