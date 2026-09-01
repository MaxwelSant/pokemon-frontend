import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('/api/pokemons')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [] }),
      });
    }
    if (url.includes('/api/types')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [] }),
      });
    }
    return Promise.reject(new Error('Unknown URL: ' + url));
  });
});

afterEach(() => {
  global.fetch.mockRestore && global.fetch.mockRestore();
});

test("renders 'failure 2' text in the page after data loads", async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText('failure 2')).toBeInTheDocument();
  });
});

test("existing h1 'Pokemon Explorer v2' is still present (preservation boundary check)", async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByRole('heading', { level: 1, name: 'Pokemon Explorer v2' })).toBeInTheDocument();
  });
});
