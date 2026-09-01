import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

const renderFilterBar = () =>
  renderToStaticMarkup(
    <FilterBar
      filters={{ name: '', type: '', legendary: '' }}
      types={[]}
      onFilterChange={() => {}}
      onClearFilters={() => {}}
    />
  );

test('renders the search-filter label as "Search by Pokemon Name:"', () => {
  const markup = renderFilterBar();
  expect(markup).toContain('Search by Pokemon Name:');
});

test('no longer renders the old "Search by Name:" label text', () => {
  const markup = renderFilterBar();
  expect(markup).not.toContain('>Search by Name:<');
});

test('keeps the label/input association for the name filter', () => {
  const markup = renderFilterBar();
  expect(markup).toContain('for="name-filter"');
  expect(markup).toContain('id="name-filter"');
});
