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

  test("renders label 'Search by Pokemon Name:' associated with the name-filter input", () => {
    render(<FilterBar {...baseProps} />);

    const label = screen.getByText(/Search by Pokemon Name:/);
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'name-filter');
  });

  test("name-filter input still has placeholder 'Enter Pokemon name...'", () => {
    render(<FilterBar {...baseProps} />);

    const input = screen.getByPlaceholderText('Enter Pokemon name...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'name-filter');
  });
});
