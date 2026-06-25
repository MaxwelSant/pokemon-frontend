import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

describe('FilterBar', () => {
  const renderMarkup = () =>
    renderToStaticMarkup(
      <FilterBar
        filters={{ name: '', type: '', legendary: '' }}
        types={[]}
        onFilterChange={() => {}}
        onClearFilters={() => {}}
      />
    );

  it('renders the search label as "Search by Pokemon Name:"', () => {
    expect(renderMarkup()).toContain('Search by Pokemon Name:');
  });

  it('does not render the old label "Search by Name:"', () => {
    expect(renderMarkup()).not.toContain('>Search by Name:<');
  });
});
