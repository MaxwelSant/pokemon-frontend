import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FilterBar from './FilterBar';

// Render FilterBar to static markup with minimal, inert props. Using
// react-dom/server (already a dependency) avoids requiring @testing-library,
// which is not declared in package.json.
const renderMarkup = () =>
  ReactDOMServer.renderToStaticMarkup(
    <FilterBar
      filters={{ name: '', type: '', legendary: '' }}
      types={[]}
      onFilterChange={() => {}}
      onClearFilters={() => {}}
    />
  );

describe('FilterBar', () => {
  test("renders the name-filter label as 'Search by Pokemon Name:'", () => {
    const markup = renderMarkup();
    expect(markup).toContain('Search by Pokemon Name:');
  });

  test('keeps the sibling labels unchanged', () => {
    const markup = renderMarkup();
    expect(markup).toContain('Filter by Type:');
    expect(markup).toContain('Legendary Status:');
  });
});
