import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

describe('FilterBar', () => {
  const baseProps = {
    filters: { name: '', type: '', legendary: '' },
    types: [],
    onFilterChange: () => {},
    onClearFilters: () => {}
  };

  test('renders the name-filter label as "Search by Pokemon Name:"', () => {
    const markup = renderToStaticMarkup(<FilterBar {...baseProps} />);
    expect(markup).toContain('Search by Pokemon Name:');
  });
});
