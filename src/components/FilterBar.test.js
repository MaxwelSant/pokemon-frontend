import React from 'react';
import { renderToString } from 'react-dom/server';
import FilterBar from './FilterBar';

test('renders "Search by Pokemon Name:" label for the name filter', () => {
  const html = renderToString(
    React.createElement(FilterBar, {
      filters: { name: '', type: '', legendary: '' },
      types: [],
      onFilterChange: () => {},
      onClearFilters: () => {}
    })
  );
  expect(html).toContain('Search by Pokemon Name:');
});
