import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FilterBar from './FilterBar';

describe('FilterBar search label', () => {
  const renderMarkup = () =>
    ReactDOMServer.renderToStaticMarkup(
      <FilterBar
        filters={{ name: '', type: '', legendary: '' }}
        types={[]}
        onFilterChange={() => {}}
        onClearFilters={() => {}}
      />
    );

  it('renders the search label as "Search by Pokemon Name:"', () => {
    const markup = renderMarkup();
    expect(markup).toContain('Search by Pokemon Name:');
  });

  it('no longer renders the old label text "Search by Name:"', () => {
    const markup = renderMarkup();
    expect(markup).not.toContain('>Search by Name:<');
  });

  it('preserves the label/input association for the name filter', () => {
    const markup = renderMarkup();
    expect(markup).toContain('for="name-filter"');
    expect(markup).toContain('id="name-filter"');
  });
});
