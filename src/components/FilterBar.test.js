import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

// Dependency-free render test: relies only on react + react-dom (both declared
// in package.json), so it runs unchanged in a clean production `npm install`
// without pulling in @testing-library or jest-dom.
describe('FilterBar', () => {
  const defaultProps = {
    filters: { name: '', type: '', legendary: '' },
    types: [],
    onFilterChange: () => {},
    onClearFilters: () => {},
  };

  const markup = () => renderToStaticMarkup(<FilterBar {...defaultProps} />);

  test("renders the label text 'Search by Pokemon Name:'", () => {
    expect(markup()).toContain('Search by Pokemon Name:');
  });

  test("does not render the old label text 'Search by Name:'", () => {
    // The old copy was the exact text node ">Search by Name:<"; the new copy
    // ("Search by Pokemon Name:") legitimately contains "by Name:" as a
    // substring, so assert on the full old label rather than a fragment.
    expect(markup()).not.toContain('>Search by Name:<');
  });
});
