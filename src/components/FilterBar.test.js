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
  test("rendered markup contains 'Search by Pokemon Name:'", () => {
    const markup = renderToStaticMarkup(<FilterBar {...baseProps} />);
    expect(markup).toContain('Search by Pokemon Name:');
  });

  test("rendered markup still contains 'Filter by Type:'", () => {
    const markup = renderToStaticMarkup(<FilterBar {...baseProps} />);
    expect(markup).toContain('Filter by Type:');
  });

  test("rendered markup still contains 'Legendary Status:'", () => {
    const markup = renderToStaticMarkup(<FilterBar {...baseProps} />);
    expect(markup).toContain('Legendary Status:');
  });
});
