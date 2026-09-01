import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import FilterBar from './FilterBar';

const noop = () => {};

const baseProps = {
  filters: { name: '', type: '', legendary: '' },
  types: [],
  onFilterChange: noop,
  onClearFilters: noop,
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

test("renders the name-search label text 'Search by Pokemon Name:'", () => {
  act(() => {
    root.render(<FilterBar {...baseProps} />);
  });

  expect(container.textContent).toContain('Search by Pokemon Name:');
});

test('the name-filter input remains associated with the label via htmlFor/id', () => {
  act(() => {
    root.render(<FilterBar {...baseProps} />);
  });

  const label = container.querySelector('label[for="name-filter"]');
  const input = container.querySelector('input#name-filter');

  expect(label).not.toBeNull();
  expect(input).not.toBeNull();
  expect(label.getAttribute('for')).toBe(input.id);
});
