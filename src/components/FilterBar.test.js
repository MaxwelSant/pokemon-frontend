import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import FilterBar from './FilterBar';

const baseProps = {
  filters: { name: '', type: '', legendary: '' },
  types: [],
  onFilterChange: () => {},
  onClearFilters: () => {}
};

let container;
let root;

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
});

test("renders FilterBar and the text content includes 'Search by Pokemon Name:'", () => {
  act(() => {
    root.render(<FilterBar {...baseProps} />);
  });

  expect(container.textContent).toContain('Search by Pokemon Name:');
});

test("the name-filter label is associated with the name input via htmlFor='name-filter'", () => {
  act(() => {
    root.render(<FilterBar {...baseProps} />);
  });

  const label = container.querySelector('label[for="name-filter"]');
  expect(label).not.toBeNull();
  expect(label.textContent).toContain('Search by Pokemon Name:');

  const input = container.querySelector('input#name-filter');
  expect(input).not.toBeNull();
});
