import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import FilterBar from './FilterBar';

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

test('renders the name-filter label as "Search by Pokemon Name:"', () => {
  const root = renderFilterBar();
  expect(container.textContent).toContain('Search by Pokemon Name:');
  act(() => root.unmount());
});

test('preserves the sibling filter labels', () => {
  const root = renderFilterBar();
  expect(container.textContent).toContain('Filter by Type:');
  expect(container.textContent).toContain('Legendary Status:');
  act(() => root.unmount());
});
