import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

describe('FilterBar', () => {
  const baseProps = {
    filters: { name: '', type: '', legendary: '' },
    types: ['Fire', 'Water'],
    onFilterChange: () => {},
    onClearFilters: () => {},
  };

  test('renders the "Search by Pokemon Name:" label for the name filter', () => {
    const html = renderToStaticMarkup(<FilterBar {...baseProps} />);
    expect(html).toContain('Search by Pokemon Name:');
  });
});
