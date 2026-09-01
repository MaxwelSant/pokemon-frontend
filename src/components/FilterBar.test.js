import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

describe('FilterBar search label', () => {
  const renderMarkup = () =>
    renderToStaticMarkup(
      <FilterBar
        filters={{ name: '', type: '', legendary: '' }}
        types={[]}
        onFilterChange={() => {}}
        onClearFilters={() => {}}
      />
    );

  test("renders the 'Search by Pokemon Name:' label", () => {
    expect(renderMarkup()).toContain('Search by Pokemon Name:');
  });

  test("does not render the old '>Search by Name:<' label", () => {
    expect(renderMarkup()).not.toContain('>Search by Name:<');
  });
});
