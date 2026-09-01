import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import FilterBar from './FilterBar';

test('renders the Search by Pokemon Name label', () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  act(() => {
    createRoot(container).render(
      <FilterBar
        filters={{ name: '', type: '', legendary: '' }}
        types={[]}
        onFilterChange={() => {}}
        onClearFilters={() => {}}
      />
    );
  });
  expect(container.textContent).toContain('Search by Pokemon Name:');
  expect(container.textContent).not.toContain('Search by Name:');
  document.body.removeChild(container);
});
