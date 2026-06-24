import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

describe('FilterBar search label', () => {
  const renderMarkup = () =>
    renderToStaticMarkup(
      <FilterBar
        filters={{ name: '', type: '', legendary: '' }}
        types={[]}
        onFilterChange={() => {}}
        onClearFilters={() => {}}
      />
    );

  test('renders the updated "Search by Pokemon Name:" label', () => {
    expect(renderMarkup()).toContain('Search by Pokemon Name:');
  });

  test('no longer renders the old "Search by Name:" text node', () => {
    expect(renderMarkup()).not.toContain('>Search by Name:<');
  });

  test('preserves the name-filter htmlFor/id association', () => {
    const markup = renderMarkup();
    expect(markup).toContain('for="name-filter"');
    expect(markup).toContain('id="name-filter"');
  });

  test('preserves the sibling filter labels', () => {
    const markup = renderMarkup();
    expect(markup).toContain('Filter by Type:');
    expect(markup).toContain('Legendary Status:');
  });
});
