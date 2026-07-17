import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('/api/pokemons')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ data: [] }) });
    }
    if (url.includes('/api/types')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ data: [] }) });
    }
    return Promise.reject(new Error('unexpected fetch url: ' + url));
  });
});

test('page contains "failure 3" on initial load, matching the TestRigor assertion', async () => {
  render(<App />);
  const match = await screen.findByText(/failure 3/i);
  expect(match).toBeInTheDocument();
});

test('existing jira-link-button is preserved', async () => {
  render(<App />);
  expect(await screen.findByText('Link Jira Issue')).toBeInTheDocument();
});
