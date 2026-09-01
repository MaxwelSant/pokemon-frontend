import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

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

  test('renders the "Search by Pokemon Name:" label', () => {
    expect(renderMarkup()).toContain('Search by Pokemon Name:');
  });

  test('does not render the old "Search by Name:" label', () => {
    expect(renderMarkup()).not.toContain('>Search by Name:<');
  });

  test('preserves the name-filter htmlFor/id association', () => {
    const markup = renderMarkup();
    expect(markup).toContain('for="name-filter"');
    expect(markup).toContain('id="name-filter"');
  });
});
