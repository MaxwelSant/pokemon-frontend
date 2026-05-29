import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterBar from './FilterBar';

describe('FilterBar', () => {
  const baseProps = {
    filters: { name: '', type: '', legendary: '' },
    types: [],
    onFilterChange: () => {},
    onClearFilters: () => {},
  };

  test("renders the name-filter label text 'Search by Pokemon Name:'", () => {
    render(<FilterBar {...baseProps} />);
    expect(screen.getByText('Search by Pokemon Name:')).toBeInTheDocument();
  });

  test("still renders the existing 'Filter by Type:' label", () => {
    render(<FilterBar {...baseProps} />);
    expect(screen.getByText('Filter by Type:')).toBeInTheDocument();
  });
});
