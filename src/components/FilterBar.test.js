import React from 'react';
import { renderToString } from 'react-dom/server';
import FilterBar from './FilterBar';

test('renders the name-filter label as "Search by Pokemon Name:"', () => {
  const html = renderToString(
    <FilterBar
      filters={{ name: '', type: '', legendary: '' }}
      types={[]}
      onFilterChange={() => {}}
      onClearFilters={() => {}}
    />
  );
  expect(html).toContain('Search by Pokemon Name:');
});
