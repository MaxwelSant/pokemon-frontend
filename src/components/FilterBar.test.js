import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import FilterBar from './FilterBar';

let container = null;
let root = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => {
    root.unmount();
  });
  container.remove();
  container = null;
  root = null;
});

test('FilterBar renders the "Search by Pokemon Name:" label for the name filter', () => {
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

  const label = container.querySelector('label[for="name-filter"]');
  expect(label).not.toBeNull();
  expect(label.textContent.trim()).toBe('Search by Pokemon Name:');
  expect(container.textContent).toContain('Search by Pokemon Name:');
});
