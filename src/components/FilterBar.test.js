import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FilterBar from './FilterBar';

test('FilterBar renders the "Search by Pokemon Name:" label', () => {
  const html = ReactDOMServer.renderToStaticMarkup(
    <FilterBar
      filters={{ name: '', type: '', legendary: '' }}
      types={[]}
      onFilterChange={() => {}}
      onClearFilters={() => {}}
    />
  );
  expect(html).toContain('Search by Pokemon Name:');
});

test('FilterBar no longer renders the old "Search by Name:" label', () => {
  const html = ReactDOMServer.renderToStaticMarkup(
    <FilterBar
      filters={{ name: '', type: '', legendary: '' }}
      types={[]}
      onFilterChange={() => {}}
      onClearFilters={() => {}}
    />
  );
  expect(html).not.toContain('Search by Name:');
});
