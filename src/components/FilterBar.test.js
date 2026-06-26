import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import FilterBar from './FilterBar';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

function renderFilterBar() {
  const root = createRoot(container);
  act(() => {
    root.render(
      <FilterBar
        filters={{ name: '', type: '', legendary: '' }}
        types={[]}
        onFilterChange={() => {}}
        onClearFilters={() => {}}
      />
    );
  });
  return root;
}

describe('FilterBar name-filter label', () => {
  test("renders the name-filter label text 'Search by Pokemon Name:'", () => {
    const root = renderFilterBar();
    expect(container.textContent).toContain('Search by Pokemon Name:');
    act(() => root.unmount());
  });

  test("does not render the old 'Search by Name:' label wording", () => {
    const root = renderFilterBar();
    expect(container.textContent).not.toContain('Search by Name:');
    act(() => root.unmount());
  });

  test("still renders the 'Filter by Type:' and 'Legendary Status:' labels (preservation)", () => {
    const root = renderFilterBar();
    expect(container.textContent).toContain('Filter by Type:');
    expect(container.textContent).toContain('Legendary Status:');
    act(() => root.unmount());
  });
});
