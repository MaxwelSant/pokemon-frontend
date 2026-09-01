import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import FilterBar from './FilterBar';

// Use the project's own declared dependencies (react / react-dom) plus the
// Jest runtime that react-scripts ships. This avoids relying on
// @testing-library/react or @testing-library/jest-dom, which are not declared
// in package.json.
global.IS_REACT_ACT_ENVIRONMENT = true;

describe('FilterBar', () => {
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
    container = null;
  });

  test("renders the label text 'Search by Pokemon Name:'", () => {
    act(() => {
      root.render(<FilterBar {...baseProps} />);
    });
    expect(container.textContent).toContain('Search by Pokemon Name:');
  });

  test("name input still has placeholder 'Enter Pokemon name...' (preservation boundary)", () => {
    act(() => {
      root.render(<FilterBar {...baseProps} />);
    });
    const input = container.querySelector('#name-filter');
    expect(input).not.toBeNull();
    expect(input.getAttribute('placeholder')).toBe('Enter Pokemon name...');
  });
});
