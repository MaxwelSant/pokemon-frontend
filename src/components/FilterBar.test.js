import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

test('renders the name search label as "Search by Pokemon Name:"', () => {
  const markup = renderToStaticMarkup(
    React.createElement(FilterBar, {
      filters: { name: '', type: '', legendary: '' },
      types: [],
      onFilterChange: () => {},
      onClearFilters: () => {},
    })
  );
  expect(markup).toContain('Search by Pokemon Name:');
});

test('retains the other filter labels', () => {
  const markup = renderToStaticMarkup(
    React.createElement(FilterBar, {
      filters: { name: '', type: '', legendary: '' },
      types: [],
      onFilterChange: () => {},
      onClearFilters: () => {},
    })
  );
  expect(markup).toContain('Filter by Type:');
  expect(markup).toContain('Legendary Status:');
});
