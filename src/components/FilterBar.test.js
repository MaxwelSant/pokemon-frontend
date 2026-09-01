import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import FilterBar from './FilterBar';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  act(() => {
    unmountComponentAtNode(container);
  });
  container.remove();
  container = null;
});

const baseProps = {
  filters: { name: '', type: '', legendary: '' },
  types: [],
  onFilterChange: () => {},
  onClearFilters: () => {},
};

test("renders the name search label as 'Search by Pokemon Name:'", () => {
  act(() => {
    render(<FilterBar {...baseProps} />, container);
  });

  expect(container.textContent).toContain('Search by Pokemon Name:');
});

test("does not render the old label text 'Search by Name:'", () => {
  act(() => {
    render(<FilterBar {...baseProps} />, container);
  });

  const label = container.querySelector('label[for="name-filter"]');
  expect(label).not.toBeNull();
  expect(label.textContent.trim()).toBe('Search by Pokemon Name:');
});
