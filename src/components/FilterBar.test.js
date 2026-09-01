import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

describe('FilterBar label text', () => {
  const renderHtml = () =>
    renderToStaticMarkup(
      <FilterBar
        filters={{ name: '', type: '', legendary: '' }}
        types={[]}
        onFilterChange={() => {}}
        onClearFilters={() => {}}
      />
    );

  test('renders the "Search by Pokemon Name:" label', () => {
    const html = renderHtml();
    expect(html).toContain('Search by Pokemon Name:');
  });

  test('does not render the legacy ">Search by Name:<" label', () => {
    const html = renderHtml();
    expect(html).not.toMatch(/>\s*Search by Name:\s*</);
  });
});
