import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import FilterBar from './FilterBar';

describe('FilterBar label', () => {
  it('renders the "Search by Pokemon Name:" label above the name input', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => {
      root.render(
        <FilterBar
          filters={{ name: '', type: '', legendary: '' }}
          types={['Fire', 'Water']}
          onFilterChange={() => {}}
          onClearFilters={() => {}}
        />
      );
    });
    expect(container.textContent).toContain('Search by Pokemon Name:');
    expect(container.textContent).not.toContain('Search by Name:');
    act(() => { root.unmount(); });
    container.remove();
  });
});
