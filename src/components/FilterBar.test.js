import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FilterBar from './FilterBar';

describe('FilterBar label text', () => {
  const renderMarkup = () =>
    ReactDOMServer.renderToStaticMarkup(
      <FilterBar
        filters={{ name: '', type: '', legendary: '' }}
        types={[]}
        onFilterChange={() => {}}
        onClearFilters={() => {}}
      />
    );

  test("renders the 'Search by Pokemon Name:' label for the name filter", () => {
    const markup = renderMarkup();
    expect(markup).toContain('Search by Pokemon Name:');
  });

  test("preserves the 'Filter by Type:' label", () => {
    const markup = renderMarkup();
    expect(markup).toContain('Filter by Type:');
  });

  test("preserves the 'Legendary Status:' label", () => {
    const markup = renderMarkup();
    expect(markup).toContain('Legendary Status:');
  });
});
