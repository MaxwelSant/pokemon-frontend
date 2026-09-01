import { render, screen } from '@testing-library/react';
import App from './App';

// Mock fetch so both API calls resolve with empty data,
// allowing the main rendered state (not loading/error) to appear.
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
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: [] }),
    });
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders 'testRigor header' text in the page after data loads", async () => {
  render(<App />);
  const element = await screen.findByText(/testRigor header/i);
  expect(element).toBeInTheDocument();
});
