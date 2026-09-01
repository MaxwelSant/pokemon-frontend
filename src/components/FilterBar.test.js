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

  const renderFilterBar = () => {
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
    return root;
  };

  it("renders the name-filter label containing the exact text 'Search by Pokemon Name:'", () => {
    renderFilterBar();
    expect(container.textContent).toContain('Search by Pokemon Name:');
  });
});
