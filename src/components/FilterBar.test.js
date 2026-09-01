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

describe('FilterBar search label', () => {
  test("renders the 'Search by Pokemon Name:' label", () => {
    expect(renderMarkup()).toContain('Search by Pokemon Name:');
  });

  test("does not render the old 'Search by Name:' text node", () => {
    expect(renderMarkup()).not.toContain('>Search by Name:<');
  });

  test('preserves the label/input association for the name filter', () => {
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
