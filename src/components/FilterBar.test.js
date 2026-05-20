import React from 'react';
import { render, screen } from '@testing-library/react';
import FilterBar from './FilterBar';

describe('FilterBar', () => {
  it("renders the label text 'Search by Pokemon Name:' inside the FilterBar component", () => {
    render(
      <FilterBar
        filters={{ name: '', type: '', legendary: '' }}
        types={[]}
        onFilterChange={jest.fn()}
        onClearFilters={jest.fn()}
      />
    );

    expect(screen.getByText(/Search by Pokemon Name:/)).toBeTruthy();
  });
});
