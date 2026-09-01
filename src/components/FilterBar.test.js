import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import FilterBar from './FilterBar';

const baseProps = {
  filters: { name: '', type: '', legendary: '' },
  types: [],
  onFilterChange: () => {},
  onClearFilters: () => {}
};

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  act(() => {
    ReactDOM.unmountComponentAtNode(container);
  });
  container.remove();
  container = null;
});

test("renders the name-filter label text 'Search by Pokemon Name:'", () => {
  act(() => {
    ReactDOM.render(<FilterBar {...baseProps} />, container);
  });
  expect(container.textContent).toContain('Search by Pokemon Name:');
});

test("still renders the input with id 'name-filter' (accessibility wiring preserved)", () => {
  act(() => {
    ReactDOM.render(<FilterBar {...baseProps} />, container);
  });
  expect(container.querySelector('#name-filter')).not.toBeNull();
});
