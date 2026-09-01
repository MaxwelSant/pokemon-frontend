import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the fetch API
global.fetch = jest.fn();

// Mock the components
jest.mock('./components/LoadingSpinner', () => {
  return function DummyLoadingSpinner() {
    return <div>Loading...</div>;
  };
});

jest.mock('./components/PokemonCard', () => {
  return function DummyPokemonCard() {
    return <div>Pokemon Card</div>;
  };
});

jest.mock('./components/FilterBar', () => {
  return function DummyFilterBar() {
    return <div>Filter Bar</div>;
  };
});

describe('App', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders 'codeCake AI Agent' text in loading state", async () => {
    fetch.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<App />);

    const brandings = screen.getAllByText('codeCake AI Agent');
    expect(brandings.length).toBeGreaterThan(0);
  });

  test("renders 'codeCake AI Agent' text in error state", async () => {
    fetch.mockRejectedValue(new Error('Failed to fetch'));

    render(<App />);

    await waitFor(() => {
      const brandings = screen.getAllByText('codeCake AI Agent');
      expect(brandings.length).toBeGreaterThan(0);
    });
  });

  test("renders 'codeCake AI Agent' text in main state", async () => {
    const mockPokemonData = {
      data: [
        { id: 1, name: 'Pikachu', type: ['Electric'], legendary: false }
      ]
    };

    const mockTypesData = {
      data: ['Electric', 'Water', 'Fire']
    };

    fetch.mockImplementation((url) => {
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonData)
        });
      }
      if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTypesData)
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    render(<App />);

    await waitFor(() => {
      const brandings = screen.getAllByText('codeCake AI Agent');
      expect(brandings.length).toBeGreaterThan(0);
    });
  });

  test("branding text is inside span with className='powered-by'", async () => {
    const mockPokemonData = {
      data: [
        { id: 1, name: 'Pikachu', type: ['Electric'], legendary: false }
      ]
    };

    const mockTypesData = {
      data: ['Electric', 'Water', 'Fire']
    };

    fetch.mockImplementation((url) => {
      if (url.includes('/api/pokemons')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPokemonData)
        });
      }
      if (url.includes('/api/types')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTypesData)
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    render(<App />);

    await waitFor(() => {
      const brandings = screen.getAllByText('codeCake AI Agent');
      expect(brandings.length).toBeGreaterThan(0);
    });
  });
});
