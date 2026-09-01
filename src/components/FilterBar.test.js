import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

const noop = () => {};
const baseFilters = { name: '', type: '', legendary: '' };

test('renders the name-search label as "Search by Pokemon Name:"', () => {
  const html = renderToStaticMarkup(
    <FilterBar filters={baseFilters} types={[]} onFilterChange={noop} onClearFilters={noop} />
  );
  expect(html).toContain('Search by Pokemon Name:');
});

test('no longer renders the old label "Search by Name:"', () => {
  const html = renderToStaticMarkup(
    <FilterBar filters={baseFilters} types={[]} onFilterChange={noop} onClearFilters={noop} />
  );
  expect(html).not.toContain('>Search by Name:<');
});
