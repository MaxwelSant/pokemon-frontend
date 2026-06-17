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

  it('renders the "Search by Pokemon Name:" label', () => {
    expect(renderMarkup()).toContain('Search by Pokemon Name:');
  });

  it('does not render the legacy "Search by Name:" label (regression guard)', () => {
    expect(renderMarkup()).not.toContain('Search by Name:');
  });
});
