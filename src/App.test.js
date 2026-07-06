import { render, screen } from '@testing-library/react';
import App from './App';

function mockSuccessfulFetch() {
  global.fetch = jest.fn((url) => {
    if (url.includes('/api/pokemons')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          count: 1,
          data: [{ id: 1, name: 'Pikachu', type: ['Electric'], legendary: false, image: 'https://example.com/pikachu.png' }]
        })
      });
    }
    if (url.includes('/api/types')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true, data: ['Electric'] })
      });
    }
    return Promise.reject(new Error(`Unhandled fetch in test: ${url}`));
  });
}

describe('App footer diagnostics text', () => {
  beforeEach(() => {
    mockSuccessfulFetch();
  });

  afterEach(() => {
    delete global.fetch;
  });

  test('renders the "failure 1" diagnostics text once Pokemon data loads', async () => {
    render(<App />);

    const diagnosticsText = await screen.findByText(/failure 1/i);

    expect(diagnosticsText).toBeInTheDocument();
  });

  test('still renders the Pokemon grid alongside the diagnostics text', async () => {
    render(<App />);

    expect(await screen.findByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText(/failure 1/i)).toBeInTheDocument();
  });
});
