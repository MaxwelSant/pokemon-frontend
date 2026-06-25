import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

test('renders the Pokemon name search label', () => {
  const html = renderToStaticMarkup(
    React.createElement(FilterBar, {
      filters: { name: '', type: '', legendary: '' },
      types: [],
      onFilterChange: () => {},
      onClearFilters: () => {}
    })
  );
  expect(html).toContain('Search by Pokemon Name:');
  expect(html).not.toContain('>Search by Name:<');
});
