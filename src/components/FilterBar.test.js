import React from 'react';
import { render, screen } from '@testing-library/react';
import FilterBar from './FilterBar';

describe('FilterBar', () => {
  const baseProps = {
    filters: { name: '', type: '', legendary: '' },
    types: [],
    onFilterChange: () => {},
    onClearFilters: () => {},
  };

  test("renders the label text 'Search by Pokemon Name:' for the name search input", () => {
    render(<FilterBar {...baseProps} />);
    expect(screen.getByText('Search by Pokemon Name:')).toBeInTheDocument();
  });

  test("the name input remains associated via htmlFor/id 'name-filter'", () => {
    render(<FilterBar {...baseProps} />);
    const input = screen.getByLabelText('Search by Pokemon Name:');
    expect(input).toHaveAttribute('id', 'name-filter');
  });
});
