import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

describe('FilterBar name-search label', () => {
  const renderMarkup = () =>
    renderToStaticMarkup(
      <FilterBar
        filters={{ name: '', type: '', legendary: '' }}
        types={[]}
        onFilterChange={() => {}}
        onClearFilters={() => {}}
      />
    );

  test("renders the label 'Search by Pokemon Name:'", () => {
    expect(renderMarkup()).toContain('Search by Pokemon Name:');
  });

  test("does not render the old '>Search by Name:<' text node", () => {
    expect(renderMarkup()).not.toContain('>Search by Name:<');
  });
});
