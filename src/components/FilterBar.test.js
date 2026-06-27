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
        onFilterChange={jest.fn()}
        onClearFilters={jest.fn()}
      />
    );

  test("renders the name search label with exact text 'Search by Pokemon Name:'", () => {
    renderFilterBar();
    expect(screen.getByText('Search by Pokemon Name:')).toBeInTheDocument();
  });

  test("does not render the old label text 'Search by Name:'", () => {
    renderFilterBar();
    expect(screen.queryByText('Search by Name:')).not.toBeInTheDocument();
  });
});
