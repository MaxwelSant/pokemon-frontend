import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

const baseProps = {
  filters: { name: '', type: '', legendary: '' },
  types: [],
  onFilterChange: () => {},
  onClearFilters: () => {}
};

describe('FilterBar search label', () => {
  test("renders the label text 'Search by Pokemon Name:'", () => {
    const markup = renderToStaticMarkup(<FilterBar {...baseProps} />);
    expect(markup).toContain('Search by Pokemon Name:');
  });

  test("does not render the old label text 'Search by Name:'", () => {
    const markup = renderToStaticMarkup(<FilterBar {...baseProps} />);
    expect(markup).not.toContain('Search by Name:');
  });

  test('still associates the label with the name-filter input (htmlFor="name-filter")', () => {
    const markup = renderToStaticMarkup(<FilterBar {...baseProps} />);
    expect(markup).toContain('for="name-filter"');
    expect(markup).toContain('id="name-filter"');
  });
});
