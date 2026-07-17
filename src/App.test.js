import { render, screen } from '@testing-library/react';
import App from './App';

const mockPokemon = {
  id: 1,
  name: 'Pikachu',
  type: ['Electric'],
  legendary: false,
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
};

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('/api/pokemons')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true, count: 1, data: [mockPokemon] })
      });
    }
    if (url.includes('/api/types')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true, data: ['Electric'] })
      });
    }
    return Promise.reject(new Error('Unknown fetch URL: ' + url));
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders the "failure 1" marker text on the loaded root page', async () => {
  render(<App />);

  // wait for the success branch to render (loading -> false, error -> null)
  await screen.findByText('Pikachu');

  expect(screen.getByText('failure 1')).toBeInTheDocument();
});

test('does not render the marker text while still loading', () => {
  render(<App />);

  expect(screen.queryByText('failure 1')).not.toBeInTheDocument();
});
