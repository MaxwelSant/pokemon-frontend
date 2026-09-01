import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

const baseProps = {
  filters: { name: '', type: '', legendary: '' },
  types: [],
  onFilterChange: () => {},
  onClearFilters: () => {},
};

describe('FilterBar', () => {
  test("renders the search label text 'Search by Pokemon Name:'", () => {
    const markup = renderToStaticMarkup(<FilterBar {...baseProps} />);
    expect(markup).toContain('Search by Pokemon Name:');
  });

  test("does not render the stale exact label 'Search by Name:'", () => {
    const markup = renderToStaticMarkup(<FilterBar {...baseProps} />);
    expect(markup).not.toContain('Search by Name:');
  });
});
