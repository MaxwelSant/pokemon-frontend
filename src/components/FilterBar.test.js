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
  container.remove();
  container = null;
});

const baseProps = {
  filters: { name: '', type: '', legendary: '' },
  types: [],
  onFilterChange: () => {},
  onClearFilters: () => {}
};

test('renders the name filter label as "Search by Pokemon Name:"', () => {
  act(() => {
    createRoot(container).render(<FilterBar {...baseProps} />);
  });
  expect(container.textContent).toContain('Search by Pokemon Name:');
});
