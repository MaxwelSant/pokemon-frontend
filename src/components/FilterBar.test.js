import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import FilterBar from './FilterBar';

describe('FilterBar', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it("renders the label text 'Search by Pokemon Name:' for the name filter", () => {
    act(() => {
      ReactDOM.createRoot(container).render(
        <FilterBar
          filters={{ name: '', type: '', legendary: '' }}
          types={[]}
          onFilterChange={jest.fn()}
          onClearFilters={jest.fn()}
        />
      );
    });

    expect(container.textContent).toContain('Search by Pokemon Name:');
  });
});
