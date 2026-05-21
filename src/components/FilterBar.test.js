import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

describe('FilterBar name-search label', () => {
  const noop = () => {};
  const baseProps = {
    filters: { name: '', type: '', legendary: '' },
    types: [],
    onFilterChange: noop,
    onClearFilters: noop,
  };

  test('renders "Search by Pokemon Name:" as the name-filter label', () => {
    const html = renderToStaticMarkup(<FilterBar {...baseProps} />);
    expect(html).toContain('Search by Pokemon Name:');
  });

  test('does not render the legacy "Search by Name:" label', () => {
    const html = renderToStaticMarkup(<FilterBar {...baseProps} />);
    expect(html).not.toMatch(/Search by Name:(?! )/);
  });
});
