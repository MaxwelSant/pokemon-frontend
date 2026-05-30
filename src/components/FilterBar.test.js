import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import FilterBar from './FilterBar';

describe('FilterBar', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('renders the Pokemon name search label text', () => {
    const root = createRoot(container);
    act(() => {
      root.render(
        <FilterBar
          filters={{ name: '', type: '', legendary: '' }}
          types={[]}
          onFilterChange={() => {}}
          onClearFilters={() => {}}
        />
      );
    });

    expect(container.textContent.includes('Search by Pokemon Name:')).toBe(true);

    act(() => {
      root.unmount();
    });
  });
});
