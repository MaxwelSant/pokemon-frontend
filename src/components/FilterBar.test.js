import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import FilterBar from './FilterBar';

describe('FilterBar search label', () => {
  let container;
  let root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    container = null;
  });

  const renderFilterBar = () => {
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
  };

  test("renders label text 'Search by Pokemon Name:'", () => {
    renderFilterBar();
    expect(container.textContent).toContain('Search by Pokemon Name:');
  });

  test("does not render the old 'Search by Name:' label text", () => {
    renderFilterBar();
    const label = container.querySelector('label[for="name-filter"]');
    expect(label).not.toBeNull();
    expect(label.textContent.trim()).toBe('Search by Pokemon Name:');
  });
});
