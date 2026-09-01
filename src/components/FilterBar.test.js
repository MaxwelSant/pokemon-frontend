import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

describe('FilterBar', () => {
  const noop = () => {};
  const baseProps = {
    filters: { name: '', type: '', legendary: '' },
    types: ['Electric', 'Fire'],
    onFilterChange: noop,
    onClearFilters: noop,
  };

  it('renders the name-search label as "Search by Pokemon Name:"', () => {
    const html = renderToStaticMarkup(<FilterBar {...baseProps} />);
    expect(html).toContain('Search by Pokemon Name:');
  });

  it('does not render the legacy "Search by Name:" label', () => {
    const html = renderToStaticMarkup(<FilterBar {...baseProps} />);
    expect(html).not.toMatch(/Search by Name:/);
  });
});
