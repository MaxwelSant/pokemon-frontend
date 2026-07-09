import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

const mockPokemons = [
  { id: 1, name: 'Pikachu', type: ['Electric'], legendary: false },
  { id: 2, name: 'Mewtwo', type: ['Psychic'], legendary: true }
];

const mockTypes = ['Electric', 'Psychic'];

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('/api/pokemons')) {
      return Promise.resolve({
        ok: true,
        json: async () => ({ data: mockPokemons })
      });
    }
    if (url.includes('/api/types')) {
      return Promise.resolve({
        ok: true,
        json: async () => ({ data: mockTypes })
      });
    }
    return Promise.reject(new Error(`Unexpected fetch url: ${url}`));
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders the literal text "failure 1" after initial Pokemon/type data loads successfully', async () => {
  render(<App />);

  expect(await screen.findByText(/failure 1/i)).toBeInTheDocument();
});

test('preserves existing header and pokemon grid rendering while showing "failure 1"', async () => {
  render(<App />);

  expect(await screen.findByText('Pikachu')).toBeInTheDocument();
  expect(screen.getByText('Pokemon Explorer v2')).toBeInTheDocument();
  expect(await screen.findByText(/failure 1/i)).toBeInTheDocument();
});
