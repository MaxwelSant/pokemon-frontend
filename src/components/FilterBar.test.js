import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

const renderMarkup = () =>
  renderToStaticMarkup(
    <FilterBar
      filters={{ name: '', type: '', legendary: '' }}
      types={[]}
      onFilterChange={() => {}}
      onClearFilters={() => {}}
    />
  );

describe('FilterBar name-search label', () => {
  test('renders the label text "Search by Pokemon Name:"', () => {
    expect(renderMarkup()).toContain('Search by Pokemon Name:');
  });

  test('no longer renders the old label text "Search by Name:"', () => {
    expect(renderMarkup()).not.toContain('>Search by Name:<');
  });

  test('preserves the label/input association (for/id "name-filter")', () => {
    const markup = renderMarkup();
    expect(markup).toContain('for="name-filter"');
    expect(markup).toContain('id="name-filter"');
  });

  test('leaves sibling labels unchanged', () => {
    const markup = renderMarkup();
    expect(markup).toContain('Filter by Type:');
    expect(markup).toContain('Legendary Status:');
  });
});
