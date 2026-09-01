import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import FilterBar from './FilterBar';

describe('FilterBar name filter label', () => {
  const baseProps = {
    filters: { name: '', type: '', legendary: '' },
    types: [],
    onFilterChange: () => {},
    onClearFilters: () => {}
  };

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
  });

  test("renders the name filter label text 'Search by Pokemon Name:'", () => {
    act(() => {
      root.render(<FilterBar {...baseProps} />);
    });

    expect(container.textContent).toContain('Search by Pokemon Name:');
  });

  test("does not render the old label 'Search by Name:' as the name filter caption", () => {
    act(() => {
      root.render(<FilterBar {...baseProps} />);
    });

    const nameLabel = container.querySelector('label[for="name-filter"]');
    expect(nameLabel).not.toBeNull();
    expect(nameLabel.textContent.trim()).toBe('Search by Pokemon Name:');
  });
});
