import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FilterBar from './FilterBar';

const renderFilterBar = () =>
  renderToStaticMarkup(
    <FilterBar
      filters={{ name: '', type: '', legendary: '' }}
      types={[]}
      onFilterChange={() => {}}
      onClearFilters={() => {}}
    />
  );

describe('FilterBar', () => {
  test('renders the name-filter label as "Search by Pokemon Name:"', () => {
    const html = renderFilterBar();
    expect(html).toContain('Search by Pokemon Name:');
  });

  test('does not render the old "Search by Name:" wording', () => {
    const html = renderFilterBar();
    // The old label text should be fully replaced by the new wording.
    expect(html).not.toContain('>Search by Name:<');
  });

  test('keeps the name-filter input and its placeholder intact', () => {
    const html = renderFilterBar();
    expect(html).toContain('id="name-filter"');
    expect(html).toContain('Enter Pokemon name...');
  });
});
