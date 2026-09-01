import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterBar from './FilterBar';

describe('FilterBar', () => {
  const renderFilterBar = () =>
    render(
      <FilterBar
        filters={{ name: '', type: '', legendary: '' }}
        types={[]}
        onFilterChange={() => {}}
        onClearFilters={() => {}}
      />
    );

  it("renders the label text 'Search by Pokemon Name:'", () => {
    renderFilterBar();
    expect(screen.getByText('Search by Pokemon Name:')).toBeInTheDocument();
  });

  it("does not render the old label 'Search by Name:'", () => {
    renderFilterBar();
    expect(screen.queryByText('Search by Name:')).toBeNull();
  });
});
