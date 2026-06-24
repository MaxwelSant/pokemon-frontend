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

describe('FilterBar name-search label', () => {
  test("renders the label 'Search by Pokemon Name:'", () => {
    expect(renderFilterBar()).toContain('Search by Pokemon Name:');
  });

  test("does not render the old label 'Search by Name:'", () => {
    expect(renderFilterBar()).not.toContain('>Search by Name:<');
  });
});
