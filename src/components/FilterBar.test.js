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

  it('renders the name-search label with the expected text', () => {
    const markup = renderMarkup();
    expect(markup).toContain('Search by Pokemon Name:');
  });

  it('does not render the old name-search label literal', () => {
    const markup = renderMarkup();
    expect(markup).not.toContain('>Search by Name:<');
  });
});
