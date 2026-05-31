import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

const baseProps = {
  filters: { name: '', type: '', legendary: '' },
  types: [],
  onFilterChange: () => {},
  onClearFilters: () => {}
};

describe('FilterBar', () => {
  it("renders the name search label containing 'Search by Pokemon Name:'", () => {
    const markup = renderToStaticMarkup(<FilterBar {...baseProps} />);
    expect(markup).toContain('Search by Pokemon Name:');
  });

  it("still renders the 'Filter by Type:' label", () => {
    const markup = renderToStaticMarkup(<FilterBar {...baseProps} />);
    expect(markup).toContain('Filter by Type:');
  });
});
