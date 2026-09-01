import React from 'react';
import { renderToString } from 'react-dom/server';
import FilterBar from './FilterBar';

describe('FilterBar', () => {
  const baseProps = {
    filters: { name: '', type: '', legendary: '' },
    types: ['Fire', 'Water'],
    onFilterChange: () => {},
    onClearFilters: () => {}
  };

  test('renders the "Search by Pokemon Name:" label above the name filter input', () => {
    const html = renderToString(<FilterBar {...baseProps} />);
    expect(html).toContain('Search by Pokemon Name:');
  });

  test('does not render the stale "Search by Name:" label', () => {
    const html = renderToString(<FilterBar {...baseProps} />);
    // Match the full stale phrase including the trailing colon to avoid
    // false positives on the new 'Search by Pokemon Name:' substring.
    expect(html).not.toMatch(/Search by Name:/);
  });
});
