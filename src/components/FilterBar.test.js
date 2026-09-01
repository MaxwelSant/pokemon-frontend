import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import FilterBar from './FilterBar';

// React 18 requires this flag so act(...) wraps updates without warnings.
global.IS_REACT_ACT_ENVIRONMENT = true;

describe('FilterBar', () => {
  const baseProps = {
    filters: { name: '', type: '', legendary: '' },
    types: [],
    onFilterChange: jest.fn(),
    onClearFilters: jest.fn(),
  };

  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  const renderFilterBar = () => {
    act(() => {
      createRoot(container).render(<FilterBar {...baseProps} />);
    });
  };

  test("renders label text 'Search by Pokemon Name:'", () => {
    renderFilterBar();
    expect(container.textContent).toContain('Search by Pokemon Name:');
  });

  test("does not render legacy label 'Search by Name:'", () => {
    renderFilterBar();
    expect(container.textContent).not.toContain('Search by Name:');
  });
});
