import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

describe('FilterBar', () => {
  const renderHTML = () =>
    renderToStaticMarkup(
      <FilterBar
        filters={{ name: '', type: '', legendary: '' }}
        types={[]}
        onFilterChange={() => {}}
        onClearFilters={() => {}}
      />
    );

  test("renders a label containing the exact text 'Search by Pokemon Name:'", () => {
    const html = renderHTML();
    expect(html).toContain('Search by Pokemon Name:');
  });

  test("the label rendering 'Search by Pokemon Name:' has htmlFor='name-filter'", () => {
    const html = renderHTML();
    expect(html).toMatch(
      /<label[^>]*for="name-filter"[^>]*>\s*Search by Pokemon Name:\s*<\/label>/
    );
  });
});
