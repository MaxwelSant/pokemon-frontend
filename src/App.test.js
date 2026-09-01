import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

const mockPokemons = [
  {
    id: 1,
    name: 'Pikachu',
    type: ['Electric'],
    legendary: false,
    image: 'pikachu.png'
  },
  {
    id: 2,
    name: 'Gengar',
    type: ['Ghost', 'Poison'],
    legendary: false,
    image: 'gengar.png'
  }
];

const mockTypes = ['Electric', 'Ghost', 'Poison'];

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('/api/pokemons')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: mockPokemons })
      });
    }
    if (url.includes('/api/types')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: mockTypes })
      });
    }
    return Promise.reject(new Error(`Unhandled fetch url: ${url}`));
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders the literal text "failure 1" after initial Pokemon/type data loads successfully', async () => {
  render(<App />);

  // Wait for the loading state to clear and the success branch to render.
  await waitFor(() => {
    expect(screen.getByText(/Showing \d+ of \d+ Pokemon/)).toBeInTheDocument();
  });

  expect(screen.getByText('failure 1')).toBeInTheDocument();
});

test('does not remove or alter the existing results-info text or pokemon-card rendering', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText('Showing 2 of 2 Pokemon')).toBeInTheDocument();
  });

  expect(screen.getByText('Pikachu')).toBeInTheDocument();
  expect(screen.getByText('Gengar')).toBeInTheDocument();
});
