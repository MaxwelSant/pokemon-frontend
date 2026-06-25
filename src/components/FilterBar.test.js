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
        onFilterChange={jest.fn()}
        onClearFilters={jest.fn()}
      />
    );
  });
  return root;
};

test('renders the search label as "Search by Pokemon Name:"', () => {
  const root = renderFilterBar();
  expect(container.textContent).toContain('Search by Pokemon Name:');
  act(() => {
    root.unmount();
  });
});

test('search label is associated with the name input (htmlFor/id "name-filter")', () => {
  const root = renderFilterBar();
  const label = container.querySelector('label[for="name-filter"]');
  const input = container.querySelector('#name-filter');
  expect(label).not.toBeNull();
  expect(input).not.toBeNull();
  expect(label.textContent).toContain('Search by Pokemon Name:');
  act(() => {
    root.unmount();
  });
});
