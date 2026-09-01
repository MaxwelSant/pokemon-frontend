import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => {
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({ ok: true, json: async () => ({ data: [] }) });
      }
      if (url.includes('/api/types')) {
        return Promise.resolve({ ok: true, json: async () => ({ data: [] }) });
      }
      return Promise.reject(new Error(`Unexpected fetch URL: ${url}`));
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders \'failure 1\' text in the page after data loads', async () => {
    render(<App />);
    expect(await screen.findByText('failure 1')).toBeInTheDocument();
  });

  test('existing h1 \'Pokemon Explorer v2\' is still present (preservation boundary check)', async () => {
    render(<App />);
    await screen.findByText('failure 1');
    expect(screen.getByText('Pokemon Explorer v2')).toBeInTheDocument();
  });
});
