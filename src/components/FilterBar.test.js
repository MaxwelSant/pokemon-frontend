import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

describe('FilterBar', () => {
  const renderMarkup = () =>
    renderToStaticMarkup(
      <FilterBar
        filters={{ name: '', type: '', legendary: '' }}
        types={[]}
        onFilterChange={() => {}}
        onClearFilters={() => {}}
      />
    );

  it("renders the name search label as 'Search by Pokemon Name:'", () => {
    const markup = renderMarkup();
    expect(markup).toContain('Search by Pokemon Name:');
  });

  it("no longer renders the old 'Search by Name:' text node", () => {
    const markup = renderMarkup();
    expect(markup).not.toContain('>Search by Name:<');
  });

  it("preserves the htmlFor/id 'name-filter' association", () => {
    const markup = renderMarkup();
    expect(markup).toContain('for="name-filter"');
    expect(markup).toContain('id="name-filter"');
  });

  it('preserves the sibling labels', () => {
    const markup = renderMarkup();
    expect(markup).toContain('Filter by Type:');
    expect(markup).toContain('Legendary Status:');
  });
});
