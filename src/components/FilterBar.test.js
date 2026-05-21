import React from 'react';
import { renderToString } from 'react-dom/server';
import FilterBar from './FilterBar';

const renderFilterBar = () => {
  const filters = { name: '', type: '', legendary: '' };
  const types = [];
  const noop = () => {};
  return renderToString(
    <FilterBar
      filters={filters}
      types={types}
      onFilterChange={noop}
      onClearFilters={noop}
    />
  );
};

describe('FilterBar', () => {
  test("renders the literal 'Search by Pokemon Name:' as the name-filter label text", () => {
    const html = renderFilterBar();
    expect(html).toContain('Search by Pokemon Name:');
  });

  test("renders the sibling labels 'Filter by Type:' and 'Legendary Status:'", () => {
    const html = renderFilterBar();
    expect(html).toContain('Filter by Type:');
    expect(html).toContain('Legendary Status:');
  });
});
