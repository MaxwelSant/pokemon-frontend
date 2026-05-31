import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FilterBar from './FilterBar';

describe('FilterBar', () => {
  const renderMarkup = () =>
    ReactDOMServer.renderToStaticMarkup(
      <FilterBar
        filters={{ name: '', type: '', legendary: '' }}
        types={[]}
        onFilterChange={() => {}}
        onClearFilters={() => {}}
      />
    );

  it('renders the name-search label as "Search by Pokemon Name:"', () => {
    const markup = renderMarkup();
    expect(markup).toContain('Search by Pokemon Name:');
  });

  it('keeps the name label associated with the name-filter input', () => {
    const markup = renderMarkup();
    expect(markup).toContain('for="name-filter"');
    expect(markup).toContain('id="name-filter"');
  });
});
