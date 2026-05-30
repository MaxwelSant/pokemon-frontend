import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

describe('FilterBar label rendering', () => {
  const renderMarkup = () =>
    renderToStaticMarkup(
      <FilterBar
        filters={{ name: '', type: '', legendary: '' }}
        types={[]}
        onFilterChange={() => {}}
        onClearFilters={() => {}}
      />
    );

  test('renders the Pokemon name search label', () => {
    expect(renderMarkup()).toContain('Search by Pokemon Name:');
  });

  test('preserves the type and legendary labels', () => {
    const html = renderMarkup();
    expect(html).toContain('Filter by Type:');
    expect(html).toContain('Legendary Status:');
  });

  test('preserves the name-filter input association', () => {
    expect(renderMarkup()).toContain('id="name-filter"');
  });
});
