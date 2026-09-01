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

  test('renders the name search label as "Search by Pokemon Name:"', () => {
    expect(renderMarkup()).toContain('Search by Pokemon Name:');
  });

  test('does not render the old label literal "Search by Name:"', () => {
    expect(renderMarkup()).not.toContain('>Search by Name:<');
  });
});
