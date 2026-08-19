import { render, screen } from '@testing-library/react';
import App from './App';

// Mock fetch to avoid actual API calls
global.fetch = jest.fn();

// Helper to create mock responses
const mockFetchResponses = () => {
  global.fetch.mockImplementation((url) => {
    if (url.includes('/api/pokemons')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          data: [
            { id: 1, name: 'Pikachu', type: ['Electric'], legendary: false }
          ]
        })
      });
    }
    if (url.includes('/api/types')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          data: ['Electric', 'Water', 'Fire']
        })
      });
    }
  });
};

describe('App - codeCake AI Agent Branding', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchResponses();
  });

  test("renders 'codeCake AI Agent' text in loading state", async () => {
    // Create a delayed fetch to keep loading state visible
    global.fetch.mockImplementationOnce(() => new Promise(() => {}));

    render(<App />);

    const brandingText = screen.queryByText('codeCake AI Agent');
    expect(brandingText).toBeInTheDocument();
  });

  test("renders 'codeCake AI Agent' text in error state", async () => {
    // Mock fetch to fail
    global.fetch.mockImplementation(() => {
      return Promise.reject(new Error('Network error'));
    });

    render(<App />);

    // Wait for error state to render
    const brandingText = await screen.findByText('codeCake AI Agent');
    expect(brandingText).toBeInTheDocument();
  });

  test("renders 'codeCake AI Agent' text in main state", async () => {
    mockFetchResponses();

    render(<App />);

    // Wait for main content to load
    const brandingText = await screen.findByText('codeCake AI Agent');
    expect(brandingText).toBeInTheDocument();
  });

  test("branding text is inside span with className='powered-by'", async () => {
    mockFetchResponses();

    render(<App />);

    const brandingSpan = await screen.findByText('codeCake AI Agent');
    expect(brandingSpan.tagName).toBe('SPAN');
    expect(brandingSpan).toHaveClass('powered-by');
  });
});
