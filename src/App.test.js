import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock the fetch API
global.fetch = jest.fn();

describe('App Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders "codeCake AI Agent" in loading state header', async () => {
    // Mock fetch to never resolve to keep it in loading state
    fetch.mockImplementation(() => new Promise(() => {}));

    render(<App />);

    // The branding text should appear during loading
    expect(screen.getByText('codeCake AI Agent')).toBeInTheDocument();
  });

  test('renders "codeCake AI Agent" in error state header', async () => {
    // Mock fetch to reject
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<App />);

    // Wait for error state to be rendered
    await waitFor(() => {
      expect(screen.getByText('codeCake AI Agent')).toBeInTheDocument();
    });
  });

  test('renders "codeCake AI Agent" in main state header', async () => {
    // Mock successful fetch responses
    const mockPokemonData = {
      data: [
        {
          id: 1,
          name: 'Pikachu',
          type: ['Electric'],
          legendary: false
        }
      ]
    };

    const mockTypesData = {
      data: ['Electric', 'Fire', 'Water']
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
      return Promise.reject(new Error('Unknown API endpoint'));
    });

    render(<App />);

    // Wait for main state to be rendered
    await waitFor(() => {
      expect(screen.getByText('codeCake AI Agent')).toBeInTheDocument();
    });
  });

  test('branding span has correct CSS class applied', async () => {
    const mockPokemonData = {
      data: [
        {
          id: 1,
          name: 'Pikachu',
          type: ['Electric'],
          legendary: false
        }
      ]
    };

    const mockTypesData = {
      data: ['Electric', 'Fire', 'Water']
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
      return Promise.reject(new Error('Unknown API endpoint'));
    });

    render(<App />);

    // Wait for the branding element to be rendered
    await waitFor(() => {
      const brandingElement = screen.getByText('codeCake AI Agent');
      expect(brandingElement).toHaveClass('powered-by');
    });
  });
});
