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

  test("renders label text 'Search by Pokemon Name:'", () => {
    render(<FilterBar {...baseProps} />);
    expect(screen.getByText('Search by Pokemon Name:')).toBeInTheDocument();
  });

  test('the label is associated with the name-filter input (htmlFor/id)', () => {
    render(<FilterBar {...baseProps} />);
    const label = screen.getByText('Search by Pokemon Name:');
    expect(label).toHaveAttribute('for', 'name-filter');
  });
});
