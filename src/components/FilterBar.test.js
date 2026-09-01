import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import FilterBar from './FilterBar';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('FilterBar renders a label containing the exact text "Search by Pokemon Name:"', () => {
  act(() => {
    ReactDOM.render(
      <FilterBar
        filters={{ name: '', type: '', legendary: '' }}
        types={[]}
        onFilterChange={() => {}}
        onClearFilters={() => {}}
      />,
      container
    );
  });

  expect(container.textContent).toContain('Search by Pokemon Name:');
});
