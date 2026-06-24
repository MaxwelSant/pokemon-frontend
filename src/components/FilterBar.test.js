import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

// Dependency-free render test (no @testing-library/react or jest-dom — neither is
// installed). Mirrors Test Case 1: the page must contain "Search by Pokemon Name:".
describe('FilterBar name-search label', () => {
  const renderMarkup = () =>
    renderToStaticMarkup(
      <FilterBar
        filters={{ name: '', type: '', legendary: '' }}
        types={[]}
        onFilterChange={() => {}}
        onClearFilters={() => {}}
      />
    );

  it('renders the "Search by Pokemon Name:" label', () => {
    expect(renderMarkup()).toContain('Search by Pokemon Name:');
  });

  it('does not render the old "Search by Name:" label', () => {
    expect(renderMarkup()).not.toContain('>Search by Name:<');
  });
});
